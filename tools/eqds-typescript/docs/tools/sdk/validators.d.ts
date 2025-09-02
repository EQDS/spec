/**
 * EQDS validation functions
 * Validates FHIR resources against EQDS business rules
 */
import { EqdsPatient } from './types';
/**
 * Validates that ownership percentages sum to approximately 100%
 */
export declare function validateOwnershipPercentages(totalPercentage: number): boolean;
/**
 * Validates that the patient has the correct horse species
 */
export declare function validateHorseSpecies(patient: EqdsPatient): boolean;
/**
 * Validates that the patient has required EQDS profile
 */
export declare function validateEqdsProfile(patient: EqdsPatient): boolean;
/**
 * Validates EQDS-specific business rules for a patient
 */
export declare function validateEqdsBusinessRules(patient: EqdsPatient): {
    valid: boolean;
    errors: string[];
};
/**
 * Type guard that asserts the object is a valid EQDS Patient
 */
export declare function assertEqdsPatient(obj: unknown): asserts obj is EqdsPatient;
/**
 * Non-throwing validation function that returns validation results
 */
export declare function validateEqdsPatient(obj: unknown): {
    valid: boolean;
    errors: string[];
};
/**
 * Validate a patient against the JSON Schema
 * This would use the generated schemas from @eqds/schemas
 */
export declare function validatePatientSchema(patient: unknown): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=validators.d.ts.map