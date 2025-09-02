/**
 * EQDS Patient creation and utility functions
 * Based on actual FHIR StructureDefinition and examples
 */
import { EqdsPatient, CreatePatientParams, EquineSex, BreedCode } from './types';
/**
 * Creates a valid EQDS Patient resource based on the actual FHIR StructureDefinition
 */
export declare function createEqdsPatient(params: CreatePatientParams): EqdsPatient;
/**
 * Helper function to create a patient from the existing EQDS example
 */
export declare function createPatientFromExample(): EqdsPatient;
/**
 * Helper function to create a quick test patient
 */
export declare function createTestPatient(id: string, genderStatus: EquineSex, breed?: BreedCode): EqdsPatient;
/**
 * Get total ownership percentage from a patient
 */
export declare function getOwnershipTotal(patient: EqdsPatient): number;
/**
 * Extract animal information from patient
 */
export declare function getAnimalInfo(patient: EqdsPatient): {
    species: import("./types").Coding | undefined;
    breed: import("./types").Coding | undefined;
    genderStatus: import("./types").Coding | undefined;
} | null;
/**
 * Extract color information from patient
 */
export declare function getColorInfo(patient: EqdsPatient): import("./types").Coding | undefined;
/**
 * Extract breeding information from patient
 */
export declare function getBreedingInfo(patient: EqdsPatient): {
    sire: string | undefined;
    dam: string | undefined;
} | null;
/**
 * Get all owners from patient
 */
export declare function getOwners(patient: EqdsPatient): {
    reference: string;
    percentage: number;
}[];
//# sourceMappingURL=patient.d.ts.map