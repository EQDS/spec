"use strict";
/**
 * EQDS validation functions
 * Validates FHIR resources against EQDS business rules
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOwnershipPercentages = validateOwnershipPercentages;
exports.validateHorseSpecies = validateHorseSpecies;
exports.validateEqdsProfile = validateEqdsProfile;
exports.validateEqdsBusinessRules = validateEqdsBusinessRules;
exports.assertEqdsPatient = assertEqdsPatient;
exports.validateEqdsPatient = validateEqdsPatient;
exports.validatePatientSchema = validatePatientSchema;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const types_1 = require("./types");
// Initialize AJV with formats
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
/**
 * Validates that ownership percentages sum to approximately 100%
 */
function validateOwnershipPercentages(totalPercentage) {
    return Math.abs(totalPercentage - 100) <= 0.01;
}
/**
 * Validates that the patient has the correct horse species
 */
function validateHorseSpecies(patient) {
    const animalExt = patient.extension.find(ext => ext.url === "http://hl7.org/fhir/StructureDefinition/patient-animal");
    if (!animalExt || animalExt.url !== "http://hl7.org/fhir/StructureDefinition/patient-animal") {
        return false;
    }
    const speciesExt = animalExt.extension.find(ext => ext.url === "species");
    if (!speciesExt || !("valueCodeableConcept" in speciesExt)) {
        return false;
    }
    const speciesCoding = speciesExt.valueCodeableConcept.coding[0];
    return speciesCoding.system === types_1.HORSE_SPECIES_CODING.system &&
        speciesCoding.code === types_1.HORSE_SPECIES_CODING.code;
}
/**
 * Validates that the patient has required EQDS profile
 */
function validateEqdsProfile(patient) {
    if (!patient.meta?.profile) {
        return false;
    }
    return patient.meta.profile.includes(types_1.EQDS_URLS.PROFILE_PATIENT);
}
/**
 * Validates EQDS-specific business rules for a patient
 */
function validateEqdsBusinessRules(patient) {
    const errors = [];
    // Check resource type
    if (patient.resourceType !== "Patient") {
        errors.push("Resource must be of type 'Patient'");
    }
    // Check EQDS profile
    if (!validateEqdsProfile(patient)) {
        errors.push(`Patient must declare EQDS profile: ${types_1.EQDS_URLS.PROFILE_PATIENT}`);
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
    const animalExt = patient.extension.find(ext => ext.url === "http://hl7.org/fhir/StructureDefinition/patient-animal");
    if (!animalExt) {
        errors.push("Patient must have animal extension");
    }
    else {
        // Check required genderStatus
        const genderStatusExt = animalExt.extension.find(ext => ext.url === "genderStatus");
        if (!genderStatusExt) {
            errors.push("Animal extension must include genderStatus");
        }
        else if (genderStatusExt && "valueCodeableConcept" in genderStatusExt) {
            const genderCoding = genderStatusExt.valueCodeableConcept.coding?.[0];
            if (!genderCoding || genderCoding.system !== types_1.EQDS_URLS.CODESYSTEM_SEX) {
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
            if (breedCoding && breedCoding.system !== types_1.EQDS_URLS.CODESYSTEM_BREED) {
                errors.push("Breed must use EQDS breed code system");
            }
        }
    }
    // Check ownership percentages
    const ownershipExtensions = patient.extension.filter((ext) => ext.url === types_1.EQDS_URLS.EXTENSION_OWNERSHIP);
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
            }
            else if (percentageExt.valueDecimal < 0 || percentageExt.valueDecimal > 100) {
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
function assertEqdsPatient(obj) {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Object is not a valid FHIR resource');
    }
    const resource = obj;
    // Basic FHIR validation
    if (resource.resourceType !== 'Patient') {
        throw new Error(`Expected resourceType 'Patient', got '${resource.resourceType}'`);
    }
    // Validate EQDS business rules
    const validation = validateEqdsBusinessRules(resource);
    if (!validation.valid) {
        throw new Error(`EQDS validation failed: ${validation.errors.join(', ')}`);
    }
}
/**
 * Non-throwing validation function that returns validation results
 */
function validateEqdsPatient(obj) {
    try {
        assertEqdsPatient(obj);
        return { valid: true, errors: [] };
    }
    catch (error) {
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
function validatePatientSchema(patient) {
    // This would be implemented with the generated JSON schemas
    // For now, just do business rule validation
    return validateEqdsPatient(patient);
}
//# sourceMappingURL=validators.js.map