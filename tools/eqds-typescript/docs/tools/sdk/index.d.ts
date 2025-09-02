/**
 * EQDS TypeScript SDK - Main exports
 *
 * This SDK provides TypeScript types, validation functions, and utility functions
 * for working with EQDS (Equine Data Standard) FHIR resources.
 *
 * Based on the official EQDS specification at https://eqds.org
 */
export * from './types';
export * from './patient';
export * from './validators';
export { createEqdsPatient, createPatientFromExample, createTestPatient, getOwnershipTotal, getAnimalInfo, getColorInfo, getBreedingInfo, getOwners } from './patient';
export { assertEqdsPatient, validateEqdsPatient, validateEqdsBusinessRules, validateOwnershipPercentages, validateHorseSpecies, validateEqdsProfile } from './validators';
export type { EqdsPatient, CreatePatientParams, EquineSex, BreedCode, ColorCode, PatientExtension, AnimalExtension, OwnershipExtension, ColorExtension, BreedingInfoExtension } from './types';
export { EquineSexCodes, BreedCodes, ColorCodes, HORSE_SPECIES_CODING, EQDS_URLS } from './types';
//# sourceMappingURL=index.d.ts.map