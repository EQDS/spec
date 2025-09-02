/**
 * EQDS validation functions
 * Validates FHIR resources against EQDS business rules
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { EqdsPatient, HORSE_SPECIES_CODING, OwnershipExtension, EQDS_URLS } from './types';

// Initialize AJV with formats
const ajv = new Ajv();
addFormats(ajv);

/**
 * Validates that ownership percentages sum to approximately 100%
 */
export function validateOwnershipPercentages(totalPercentage: number): boolean {
  return Math.abs(totalPercentage - 100) <= 0.01;
}

/**
 * Validates that the patient has the correct horse species
 */
export function validateHorseSpecies(patient: EqdsPatient): boolean {
  const animalExt = patient.extension.find(
    ext => ext.url === "http://hl7.org/fhir/StructureDefinition/patient-animal"
  );

  if (!animalExt || animalExt.url !== "http://hl7.org/fhir/StructureDefinition/patient-animal") {
    return false;
  }

  const speciesExt = animalExt.extension.find(ext => ext.url === "species");
  if (!speciesExt || !("valueCodeableConcept" in speciesExt)) {
    return false;
  }

  const speciesCoding = speciesExt.valueCodeableConcept.coding[0];
  return speciesCoding.system === HORSE_SPECIES_CODING.system &&
         speciesCoding.code === HORSE_SPECIES_CODING.code;
}

/**
 * Validates that the patient has required EQDS profile
 */
export function validateEqdsProfile(patient: EqdsPatient): boolean {
  if (!patient.meta?.profile) {
    return false;
  }
  
  return patient.meta.profile.includes(EQDS_URLS.PROFILE_PATIENT);
}

/**
 * Validates EQDS-specific business rules for a patient
 */
export function validateEqdsBusinessRules(patient: EqdsPatient): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check resource type
  if (patient.resourceType !== "Patient") {
    errors.push("Resource must be of type 'Patient'");
  }

  // Check EQDS profile
  if (!validateEqdsProfile(patient)) {
    errors.push(`Patient must declare EQDS profile: ${EQDS_URLS.PROFILE_PATIENT}`);
  }

  // Check required fields
  if (!patient.id || typeof patient.id !== 'string') {
    errors.push("Patient must have a valid id");
  }

  if (!Array.isArray(patient.identifier) || patient.identifier.length === 0) {
    errors.push("Patient must have at least one identifier");
  }

  if (!Array.isArray(patient.name) || patient.name.length === 0) {
    errors.push("Patient must have at least one name");
  }

  if (!Array.isArray(patient.extension)) {
    errors.push("Patient must have extensions array");
  }

  // Check horse species
  if (!validateHorseSpecies(patient)) {
    errors.push("Species must be Horse (SNOMED: 35354009)");
  }

  // Check animal extension exists
  const animalExt = patient.extension.find(
    ext => ext.url === "http://hl7.org/fhir/StructureDefinition/patient-animal"
  );
  
  if (!animalExt) {
    errors.push("Patient must have animal extension");
  } else {
    // Check required genderStatus
    const genderStatusExt = animalExt.extension.find(ext => ext.url === "genderStatus");
    if (!genderStatusExt) {
      errors.push("Animal extension must include genderStatus");
    } else if (genderStatusExt && "valueCodeableConcept" in genderStatusExt) {
      const genderCoding = genderStatusExt.valueCodeableConcept.coding?.[0];
      if (!genderCoding || genderCoding.system !== EQDS_URLS.CODESYSTEM_SEX) {
        errors.push("Gender status must use EQDS equine sex code system");
      }
      
      const validGenderCodes = ["mare", "stallion", "gelding", "colt", "filly"];
      if (!validGenderCodes.includes(genderCoding.code)) {
        errors.push(`Invalid equine sex code: ${genderCoding.code}. Must be one of: ${validGenderCodes.join(", ")}`);
      }
    }

    // Check breed if present
    const breedExt = animalExt.extension.find(ext => ext.url === "breed");
    if (breedExt && "valueCodeableConcept" in breedExt) {
      const breedCoding = breedExt.valueCodeableConcept.coding?.[0];
      if (breedCoding && breedCoding.system !== EQDS_URLS.CODESYSTEM_BREED) {
        errors.push("Breed must use EQDS breed code system");
      }
    }
  }

  // Check ownership percentages
  const ownershipExtensions = patient.extension.filter(
    (ext): ext is OwnershipExtension => 
      ext.url === EQDS_URLS.EXTENSION_OWNERSHIP
  );

  if (ownershipExtensions.length > 0) {
    const totalPercentage = ownershipExtensions.reduce((sum, ownershipExt) => {
      const percentageExt = ownershipExt.extension.find(ext => ext.url === "percentage");
      if (percentageExt && "valueDecimal" in percentageExt) {
        return sum + percentageExt.valueDecimal;
      }
      return sum;
    }, 0);

    if (!validateOwnershipPercentages(totalPercentage)) {
      errors.push(`Ownership percentages must sum to 100% (±0.01%), got ${totalPercentage}%`);
    }

    // Check each ownership extension has required elements
    ownershipExtensions.forEach((ownershipExt, index) => {
      const ownerExt = ownershipExt.extension.find(ext => ext.url === "owner");
      const percentageExt = ownershipExt.extension.find(ext => ext.url === "percentage");

      if (!ownerExt || !("valueReference" in ownerExt)) {
        errors.push(`Ownership extension ${index + 1} missing owner reference`);
      }

      if (!percentageExt || !("valueDecimal" in percentageExt)) {
        errors.push(`Ownership extension ${index + 1} missing percentage`);
      } else if (percentageExt.valueDecimal < 0 || percentageExt.valueDecimal > 100) {
        errors.push(`Ownership percentage ${index + 1} must be between 0 and 100`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Type guard that asserts the object is a valid EQDS Patient
 */
export function assertEqdsPatient(obj: unknown): asserts obj is EqdsPatient {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Object is not a valid FHIR resource');
  }

  const resource = obj as any;

  // Basic FHIR validation
  if (resource.resourceType !== 'Patient') {
    throw new Error(`Expected resourceType 'Patient', got '${resource.resourceType}'`);
  }

  // Validate EQDS business rules
  const validation = validateEqdsBusinessRules(resource as EqdsPatient);
  if (!validation.valid) {
    throw new Error(`EQDS validation failed: ${validation.errors.join(', ')}`);
  }
}

/**
 * Non-throwing validation function that returns validation results
 */
export function validateEqdsPatient(obj: unknown): { valid: boolean; errors: string[] } {
  try {
    assertEqdsPatient(obj);
    return { valid: true, errors: [] };
  } catch (error) {
    return { 
      valid: false, 
      errors: [error instanceof Error ? error.message : String(error)]
    };
  }
}

/**
 * Validate a patient against the JSON Schema
 * This would use the generated schemas from @eqds/schemas
 */
export function validatePatientSchema(patient: unknown): { valid: boolean; errors: string[] } {
  // This would be implemented with the generated JSON schemas
  // For now, just do business rule validation
  return validateEqdsPatient(patient);
}