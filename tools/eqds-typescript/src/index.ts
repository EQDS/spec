/**
 * EQDS TypeScript SDK - Main exports
 * 
 * This SDK provides TypeScript types, validation functions, and utility functions
 * for working with EQDS (Equine Data Standard) FHIR resources.
 * 
 * Based on the official EQDS specification at https://eqds.org
 */

// Types
export * from './types';

// Patient utilities
export * from './patient';

// Validation utilities
export * from './validators';

// Re-export commonly used items for convenience
export {
  createEqdsPatient,
  createPatientFromExample,
  createTestPatient,
  getOwnershipTotal,
  getAnimalInfo,
  getColorInfo,
  getBreedingInfo,
  getOwners
} from './patient';

export {
  assertEqdsPatient,
  validateEqdsPatient,
  validateEqdsBusinessRules,
  validateOwnershipPercentages,
  validateHorseSpecies,
  validateEqdsProfile
} from './validators';

// Type exports for convenience
export type {
  EqdsPatient,
  CreatePatientParams,
  EquineSex,
  BreedCode,
  ColorCode,
  PatientExtension,
  AnimalExtension,
  OwnershipExtension,
  ColorExtension,
  BreedingInfoExtension
} from './types';

// Constants
export {
  EquineSexCodes,
  BreedCodes,
  ColorCodes,
  HORSE_SPECIES_CODING,
  EQDS_URLS
} from './types';