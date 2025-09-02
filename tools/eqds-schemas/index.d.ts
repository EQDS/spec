// TypeScript definitions for EQDS Schemas

export interface JSONSchema {
  $schema: string;
  $id: string;
  title: string;
  description: string;
  type: string;
  properties: Record<string, any>;
  required: string[];
  definitions?: Record<string, any>;
}

export const schemas: Record<string, JSONSchema>;

// Individual schema exports
export const equinePatient: JSONSchema;
export const equineObservation: JSONSchema;
export const equineMedicationAdministration: JSONSchema;
export const equineImmunization: JSONSchema;
export const equineProcedure: JSONSchema;
export const equinePractitioner: JSONSchema;
export const equineOrganization: JSONSchema;