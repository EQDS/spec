/**
 * TypeScript types for EQDS FHIR resources
 * Generated from actual FHIR StructureDefinitions and CodeSystems
 */

// Base FHIR types
export interface CodeableConcept {
  coding: Coding[];
  text?: string;
}

export interface Coding {
  system: string;
  code: string;
  display: string;
}

export interface Reference {
  reference: string;
  display?: string;
}

export interface Identifier {
  type?: CodeableConcept;
  system?: string;
  value: string;
}

export interface HumanName {
  use?: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old" | "maiden";
  text?: string;
  given?: string[];
}

export interface ContactPoint {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
  value?: string;
}

export interface PatientContact {
  relationship?: CodeableConcept[];
  name?: HumanName;
  telecom?: ContactPoint[];
}

// EQDS Extensions
export interface AnimalExtension {
  url: "http://hl7.org/fhir/StructureDefinition/patient-animal";
  extension: Array<
    | { url: "species"; valueCodeableConcept: CodeableConcept }
    | { url: "breed"; valueCodeableConcept: CodeableConcept }
    | { url: "genderStatus"; valueCodeableConcept: CodeableConcept }
  >;
}

export interface OwnershipExtension {
  url: "https://eqds.org/StructureDefinition/ownership";
  extension: Array<
    | { url: "owner"; valueReference: Reference }
    | { url: "percentage"; valueDecimal: number }
  >;
}

export interface ColorExtension {
  url: "https://eqds.org/StructureDefinition/equine-color";
  valueCodeableConcept: CodeableConcept;
}

export interface BreedingInfoExtension {
  url: "https://eqds.org/StructureDefinition/breeding-info";
  extension: Array<
    | { url: "sire"; valueString: string }
    | { url: "dam"; valueString: string }
  >;
}

export type PatientExtension = 
  | AnimalExtension 
  | OwnershipExtension 
  | ColorExtension 
  | BreedingInfoExtension;

// Main EQDS Patient resource
export interface EqdsPatient {
  resourceType: "Patient";
  id: string;
  meta?: {
    profile?: string[];
  };
  text?: {
    status: "generated" | "extensions" | "additional" | "empty";
    div: string;
  };
  identifier: Identifier[];
  name: HumanName[];
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  extension: PatientExtension[];
  contact?: PatientContact[];
}

// Code System Types (from actual EQDS CodeSystems)
export type EquineSex = "mare" | "stallion" | "gelding" | "colt" | "filly";
export type BreedCode = "QH" | "TB" | "AR" | "PT" | "AP" | "WB";
export type ColorCode = "bay" | "chestnut" | "black" | "gray" | "pal" | "buck" | "pinto";

// Factory function parameters
export interface CreatePatientParams {
  id: string;
  name: string;
  barnName?: string;
  genderStatus: EquineSex;
  breed?: BreedCode;
  color?: ColorCode;
  birthDate?: string;
  owners?: Array<{ reference: string; percentage: number }>;
  sire?: string;
  dam?: string;
  identifiers?: Array<{
    system: string;
    value: string;
    type?: string;
  }>;
}

// Constants from EQDS CodeSystems
export const EquineSexCodes = {
  mare: { code: "mare", display: "Mare", definition: "Adult female horse" },
  stallion: { code: "stallion", display: "Stallion", definition: "Adult intact male horse" },
  gelding: { code: "gelding", display: "Gelding", definition: "Castrated male horse" },
  colt: { code: "colt", display: "Colt", definition: "Young male horse (typically under 4 years)" },
  filly: { code: "filly", display: "Filly", definition: "Young female horse (typically under 4 years)" }
} as const;

export const BreedCodes = {
  QH: { code: "QH", display: "Quarter Horse", definition: "American Quarter Horse" },
  TB: { code: "TB", display: "Thoroughbred", definition: "Thoroughbred" },
  AR: { code: "AR", display: "Arabian", definition: "Arabian Horse" },
  PT: { code: "PT", display: "Paint", definition: "American Paint Horse" },
  AP: { code: "AP", display: "Appaloosa", definition: "Appaloosa" },
  WB: { code: "WB", display: "Warmblood", definition: "Sport Horse/Warmblood" }
} as const;

export const ColorCodes = {
  bay: { code: "bay", display: "Bay" },
  chestnut: { code: "chestnut", display: "Chestnut" },
  black: { code: "black", display: "Black" },
  gray: { code: "gray", display: "Gray" },
  pal: { code: "pal", display: "Palomino" },
  buck: { code: "buck", display: "Buckskin" },
  pinto: { code: "pinto", display: "Pinto" }
} as const;

export const HORSE_SPECIES_CODING: Coding = {
  system: "http://snomed.info/sct",
  code: "35354009",
  display: "Horse (organism)"
};

// EQDS System URLs
export const EQDS_URLS = {
  PROFILE_PATIENT: "https://eqds.org/StructureDefinition/equine-patient",
  EXTENSION_OWNERSHIP: "https://eqds.org/StructureDefinition/ownership",
  EXTENSION_COLOR: "https://eqds.org/StructureDefinition/equine-color",
  EXTENSION_BREEDING: "https://eqds.org/StructureDefinition/breeding-info",
  CODESYSTEM_SEX: "https://eqds.org/CodeSystem/equine-sex",
  CODESYSTEM_BREED: "https://eqds.org/CodeSystem/breed-codes",
  CODESYSTEM_COLOR: "https://eqds.org/CodeSystem/color-codes"
} as const;