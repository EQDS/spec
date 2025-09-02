/**
 * TypeScript types for EQDS FHIR resources
 * Generated from actual FHIR StructureDefinitions and CodeSystems
 */
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
export interface AnimalExtension {
    url: "http://hl7.org/fhir/StructureDefinition/patient-animal";
    extension: Array<{
        url: "species";
        valueCodeableConcept: CodeableConcept;
    } | {
        url: "breed";
        valueCodeableConcept: CodeableConcept;
    } | {
        url: "genderStatus";
        valueCodeableConcept: CodeableConcept;
    }>;
}
export interface OwnershipExtension {
    url: "https://eqds.org/StructureDefinition/ownership";
    extension: Array<{
        url: "owner";
        valueReference: Reference;
    } | {
        url: "percentage";
        valueDecimal: number;
    }>;
}
export interface ColorExtension {
    url: "https://eqds.org/StructureDefinition/equine-color";
    valueCodeableConcept: CodeableConcept;
}
export interface BreedingInfoExtension {
    url: "https://eqds.org/StructureDefinition/breeding-info";
    extension: Array<{
        url: "sire";
        valueString: string;
    } | {
        url: "dam";
        valueString: string;
    }>;
}
export type PatientExtension = AnimalExtension | OwnershipExtension | ColorExtension | BreedingInfoExtension;
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
export type EquineSex = "mare" | "stallion" | "gelding" | "colt" | "filly";
export type BreedCode = "QH" | "TB" | "AR" | "PT" | "AP" | "WB";
export type ColorCode = "bay" | "chestnut" | "black" | "gray" | "pal" | "buck" | "pinto";
export interface CreatePatientParams {
    id: string;
    name: string;
    barnName?: string;
    genderStatus: EquineSex;
    breed?: BreedCode;
    color?: ColorCode;
    birthDate?: string;
    owners?: Array<{
        reference: string;
        percentage: number;
    }>;
    sire?: string;
    dam?: string;
    identifiers?: Array<{
        system: string;
        value: string;
        type?: string;
    }>;
}
export declare const EquineSexCodes: {
    readonly mare: {
        readonly code: "mare";
        readonly display: "Mare";
        readonly definition: "Adult female horse";
    };
    readonly stallion: {
        readonly code: "stallion";
        readonly display: "Stallion";
        readonly definition: "Adult intact male horse";
    };
    readonly gelding: {
        readonly code: "gelding";
        readonly display: "Gelding";
        readonly definition: "Castrated male horse";
    };
    readonly colt: {
        readonly code: "colt";
        readonly display: "Colt";
        readonly definition: "Young male horse (typically under 4 years)";
    };
    readonly filly: {
        readonly code: "filly";
        readonly display: "Filly";
        readonly definition: "Young female horse (typically under 4 years)";
    };
};
export declare const BreedCodes: {
    readonly QH: {
        readonly code: "QH";
        readonly display: "Quarter Horse";
        readonly definition: "American Quarter Horse";
    };
    readonly TB: {
        readonly code: "TB";
        readonly display: "Thoroughbred";
        readonly definition: "Thoroughbred";
    };
    readonly AR: {
        readonly code: "AR";
        readonly display: "Arabian";
        readonly definition: "Arabian Horse";
    };
    readonly PT: {
        readonly code: "PT";
        readonly display: "Paint";
        readonly definition: "American Paint Horse";
    };
    readonly AP: {
        readonly code: "AP";
        readonly display: "Appaloosa";
        readonly definition: "Appaloosa";
    };
    readonly WB: {
        readonly code: "WB";
        readonly display: "Warmblood";
        readonly definition: "Sport Horse/Warmblood";
    };
};
export declare const ColorCodes: {
    readonly bay: {
        readonly code: "bay";
        readonly display: "Bay";
    };
    readonly chestnut: {
        readonly code: "chestnut";
        readonly display: "Chestnut";
    };
    readonly black: {
        readonly code: "black";
        readonly display: "Black";
    };
    readonly gray: {
        readonly code: "gray";
        readonly display: "Gray";
    };
    readonly pal: {
        readonly code: "pal";
        readonly display: "Palomino";
    };
    readonly buck: {
        readonly code: "buck";
        readonly display: "Buckskin";
    };
    readonly pinto: {
        readonly code: "pinto";
        readonly display: "Pinto";
    };
};
export declare const HORSE_SPECIES_CODING: Coding;
export declare const EQDS_URLS: {
    readonly PROFILE_PATIENT: "https://eqds.org/StructureDefinition/equine-patient";
    readonly EXTENSION_OWNERSHIP: "https://eqds.org/StructureDefinition/ownership";
    readonly EXTENSION_COLOR: "https://eqds.org/StructureDefinition/equine-color";
    readonly EXTENSION_BREEDING: "https://eqds.org/StructureDefinition/breeding-info";
    readonly CODESYSTEM_SEX: "https://eqds.org/CodeSystem/equine-sex";
    readonly CODESYSTEM_BREED: "https://eqds.org/CodeSystem/breed-codes";
    readonly CODESYSTEM_COLOR: "https://eqds.org/CodeSystem/color-codes";
};
//# sourceMappingURL=types.d.ts.map