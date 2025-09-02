/**
 * EQDS Patient creation and utility functions
 * Based on actual FHIR StructureDefinition and examples
 */

import {
  EqdsPatient,
  CreatePatientParams,
  AnimalExtension,
  OwnershipExtension,
  ColorExtension,
  BreedingInfoExtension,
  PatientExtension,
  EquineSex,
  BreedCode,
  ColorCode,
  EquineSexCodes,
  BreedCodes,
  ColorCodes,
  HORSE_SPECIES_CODING,
  EQDS_URLS,
  HumanName,
  Identifier
} from './types';
import { validateOwnershipPercentages } from './validators';

/**
 * Creates a valid EQDS Patient resource based on the actual FHIR StructureDefinition
 */
export function createEqdsPatient(params: CreatePatientParams): EqdsPatient {
  // Validate ownership percentages if provided
  if (params.owners && params.owners.length > 0) {
    const totalPercentage = params.owners.reduce((sum, owner) => sum + owner.percentage, 0);
    if (!validateOwnershipPercentages(totalPercentage)) {
      throw new Error(`Ownership percentages must sum to approximately 100%, got ${totalPercentage}%`);
    }
  }

  // Build name array - matches real EQDS example structure
  const names: HumanName[] = [
    {
      use: "official",
      text: params.name
    }
  ];

  if (params.barnName) {
    names[0].given = [params.barnName];
  }

  // Build identifiers - using pattern from real examples
  const identifiers: Identifier[] = [];
  
  // Default medical record identifier
  identifiers.push({
    type: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/v2-0203",
        code: "MR",
        display: "Medical record number"
      }]
    },
    system: "http://example-clinic.com/horses",
    value: `EQ-${new Date().getFullYear()}-${params.id}`
  });

  // Add custom identifiers if provided
  if (params.identifiers) {
    for (const identifier of params.identifiers) {
      identifiers.push({
        type: identifier.type ? { 
          text: identifier.type,
          coding: [] // Empty coding array to satisfy CodeableConcept interface
        } : undefined,
        system: identifier.system,
        value: identifier.value
      });
    }
  }

  // Build animal extension (required) - exact structure from EQDS profile
  const animalExtension: AnimalExtension = {
    url: "http://hl7.org/fhir/StructureDefinition/patient-animal",
    extension: [
      {
        url: "species",
        valueCodeableConcept: {
          coding: [HORSE_SPECIES_CODING]
        }
      },
      {
        url: "genderStatus",
        valueCodeableConcept: {
          coding: [{
            system: EQDS_URLS.CODESYSTEM_SEX,
            code: params.genderStatus,
            display: EquineSexCodes[params.genderStatus].display
          }]
        }
      }
    ]
  };

  // Add breed if provided
  if (params.breed) {
    animalExtension.extension.push({
      url: "breed",
      valueCodeableConcept: {
        coding: [{
          system: EQDS_URLS.CODESYSTEM_BREED,
          code: params.breed,
          display: BreedCodes[params.breed].display
        }]
      }
    });
  }

  // Start with required extensions
  const extensions: PatientExtension[] = [animalExtension];

  // Add color extension if provided
  if (params.color) {
    const colorExtension: ColorExtension = {
      url: EQDS_URLS.EXTENSION_COLOR,
      valueCodeableConcept: {
        coding: [{
          system: EQDS_URLS.CODESYSTEM_COLOR,
          code: params.color,
          display: ColorCodes[params.color].display
        }]
      }
    };
    extensions.push(colorExtension);
  }

  // Add ownership extensions if provided
  if (params.owners && params.owners.length > 0) {
    params.owners.forEach((owner) => {
      const ownershipExtension: OwnershipExtension = {
        url: EQDS_URLS.EXTENSION_OWNERSHIP,
        extension: [
          {
            url: "owner",
            valueReference: {
              reference: owner.reference
            }
          },
          {
            url: "percentage",
            valueDecimal: owner.percentage
          }
        ]
      };
      extensions.push(ownershipExtension);
    });
  }

  // Add breeding info if provided
  if (params.sire || params.dam) {
    const breedingExtensions: Array<
      | { url: "sire"; valueString: string }
      | { url: "dam"; valueString: string }
    > = [];
    
    if (params.sire) {
      breedingExtensions.push({ url: "sire", valueString: params.sire });
    }
    
    if (params.dam) {
      breedingExtensions.push({ url: "dam", valueString: params.dam });
    }

    const breedingInfoExtension: BreedingInfoExtension = {
      url: EQDS_URLS.EXTENSION_BREEDING,
      extension: breedingExtensions
    };
    extensions.push(breedingInfoExtension);
  }

  // Create the patient resource
  const patient: EqdsPatient = {
    resourceType: "Patient",
    id: params.id,
    meta: {
      profile: [EQDS_URLS.PROFILE_PATIENT]
    },
    text: {
      status: "generated",
      div: `<div xmlns='http://www.w3.org/1999/xhtml'>${EquineSexCodes[params.genderStatus].display} '${params.name}'${params.breed ? `, ${BreedCodes[params.breed].display}` : ''}</div>`
    },
    identifier: identifiers,
    name: names,
    gender: "unknown", // FHIR gender is separate from equine sex
    extension: extensions
  };

  if (params.birthDate) {
    patient.birthDate = params.birthDate;
  }

  return patient;
}

/**
 * Helper function to create a patient from the existing EQDS example
 */
export function createPatientFromExample(): EqdsPatient {
  return createEqdsPatient({
    id: "example-horse-01",
    name: "Smart Little Pepto",
    barnName: "Pepto",
    genderStatus: "stallion",
    breed: "QH",
    color: "pal",
    birthDate: "2018-04-15",
    owners: [
      { reference: "RelatedPerson/owner-john-smith", percentage: 60.0 },
      { reference: "RelatedPerson/owner-jane-doe", percentage: 40.0 }
    ],
    sire: "Peptoboonsmal",
    dam: "Smart Little Lena",
    identifiers: [
      { system: "http://aqha.com/registration", value: "5742891", type: "AQHA Registration" },
      { system: "http://icar.org/microchip", value: "985141405208421", type: "Microchip" }
    ]
  });
}

/**
 * Helper function to create a quick test patient
 */
export function createTestPatient(id: string, genderStatus: EquineSex, breed?: BreedCode): EqdsPatient {
  return createEqdsPatient({
    id,
    name: `Test ${genderStatus}`,
    genderStatus,
    breed,
    owners: [{ reference: "RelatedPerson/test-owner", percentage: 100 }]
  });
}

/**
 * Get total ownership percentage from a patient
 */
export function getOwnershipTotal(patient: EqdsPatient): number {
  const ownershipExtensions = patient.extension.filter(
    (ext): ext is OwnershipExtension => 
      ext.url === EQDS_URLS.EXTENSION_OWNERSHIP
  );

  return ownershipExtensions.reduce((total, ownershipExt) => {
    const percentageExt = ownershipExt.extension.find(ext => ext.url === "percentage");
    if (percentageExt && "valueDecimal" in percentageExt) {
      return total + percentageExt.valueDecimal;
    }
    return total;
  }, 0);
}

/**
 * Extract animal information from patient
 */
export function getAnimalInfo(patient: EqdsPatient) {
  const animalExt = patient.extension.find(
    (ext): ext is AnimalExtension => 
      ext.url === "http://hl7.org/fhir/StructureDefinition/patient-animal"
  );

  if (!animalExt) {
    return null;
  }

  const species = animalExt.extension.find(ext => ext.url === "species")?.valueCodeableConcept;
  const breed = animalExt.extension.find(ext => ext.url === "breed")?.valueCodeableConcept;
  const genderStatus = animalExt.extension.find(ext => ext.url === "genderStatus")?.valueCodeableConcept;

  return {
    species: species?.coding?.[0],
    breed: breed?.coding?.[0],
    genderStatus: genderStatus?.coding?.[0]
  };
}

/**
 * Extract color information from patient
 */
export function getColorInfo(patient: EqdsPatient) {
  const colorExt = patient.extension.find(
    (ext): ext is ColorExtension => 
      ext.url === EQDS_URLS.EXTENSION_COLOR
  );

  return colorExt?.valueCodeableConcept.coding?.[0];
}

/**
 * Extract breeding information from patient
 */
export function getBreedingInfo(patient: EqdsPatient) {
  const breedingExt = patient.extension.find(
    (ext): ext is BreedingInfoExtension => 
      ext.url === EQDS_URLS.EXTENSION_BREEDING
  );

  if (!breedingExt) {
    return null;
  }

  const sireExt = breedingExt.extension.find(ext => ext.url === "sire");
  const damExt = breedingExt.extension.find(ext => ext.url === "dam");

  return {
    sire: sireExt && "valueString" in sireExt ? sireExt.valueString : undefined,
    dam: damExt && "valueString" in damExt ? damExt.valueString : undefined
  };
}

/**
 * Get all owners from patient
 */
export function getOwners(patient: EqdsPatient) {
  const ownershipExtensions = patient.extension.filter(
    (ext): ext is OwnershipExtension => 
      ext.url === EQDS_URLS.EXTENSION_OWNERSHIP
  );

  return ownershipExtensions.map(ownershipExt => {
    const ownerExt = ownershipExt.extension.find(ext => ext.url === "owner");
    const percentageExt = ownershipExt.extension.find(ext => ext.url === "percentage");

    return {
      reference: ownerExt && "valueReference" in ownerExt ? ownerExt.valueReference.reference : "",
      percentage: percentageExt && "valueDecimal" in percentageExt ? percentageExt.valueDecimal : 0
    };
  });
}