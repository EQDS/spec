"use strict";
/**
 * TypeScript types for EQDS FHIR resources
 * Generated from actual FHIR StructureDefinitions and CodeSystems
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EQDS_URLS = exports.HORSE_SPECIES_CODING = exports.ColorCodes = exports.BreedCodes = exports.EquineSexCodes = void 0;
// Constants from EQDS CodeSystems
exports.EquineSexCodes = {
    mare: { code: "mare", display: "Mare", definition: "Adult female horse" },
    stallion: { code: "stallion", display: "Stallion", definition: "Adult intact male horse" },
    gelding: { code: "gelding", display: "Gelding", definition: "Castrated male horse" },
    colt: { code: "colt", display: "Colt", definition: "Young male horse (typically under 4 years)" },
    filly: { code: "filly", display: "Filly", definition: "Young female horse (typically under 4 years)" }
};
exports.BreedCodes = {
    QH: { code: "QH", display: "Quarter Horse", definition: "American Quarter Horse" },
    TB: { code: "TB", display: "Thoroughbred", definition: "Thoroughbred" },
    AR: { code: "AR", display: "Arabian", definition: "Arabian Horse" },
    PT: { code: "PT", display: "Paint", definition: "American Paint Horse" },
    AP: { code: "AP", display: "Appaloosa", definition: "Appaloosa" },
    WB: { code: "WB", display: "Warmblood", definition: "Sport Horse/Warmblood" }
};
exports.ColorCodes = {
    bay: { code: "bay", display: "Bay" },
    chestnut: { code: "chestnut", display: "Chestnut" },
    black: { code: "black", display: "Black" },
    gray: { code: "gray", display: "Gray" },
    pal: { code: "pal", display: "Palomino" },
    buck: { code: "buck", display: "Buckskin" },
    pinto: { code: "pinto", display: "Pinto" }
};
exports.HORSE_SPECIES_CODING = {
    system: "http://snomed.info/sct",
    code: "35354009",
    display: "Horse (organism)"
};
// EQDS System URLs
exports.EQDS_URLS = {
    PROFILE_PATIENT: "https://eqds.org/StructureDefinition/equine-patient",
    EXTENSION_OWNERSHIP: "https://eqds.org/StructureDefinition/ownership",
    EXTENSION_COLOR: "https://eqds.org/StructureDefinition/equine-color",
    EXTENSION_BREEDING: "https://eqds.org/StructureDefinition/breeding-info",
    CODESYSTEM_SEX: "https://eqds.org/CodeSystem/equine-sex",
    CODESYSTEM_BREED: "https://eqds.org/CodeSystem/breed-codes",
    CODESYSTEM_COLOR: "https://eqds.org/CodeSystem/color-codes"
};
//# sourceMappingURL=types.js.map