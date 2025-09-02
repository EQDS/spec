"use strict";
/**
 * EQDS TypeScript SDK - Main exports
 *
 * This SDK provides TypeScript types, validation functions, and utility functions
 * for working with EQDS (Equine Data Standard) FHIR resources.
 *
 * Based on the official EQDS specification at https://eqds.org
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EQDS_URLS = exports.HORSE_SPECIES_CODING = exports.ColorCodes = exports.BreedCodes = exports.EquineSexCodes = exports.validateEqdsProfile = exports.validateHorseSpecies = exports.validateOwnershipPercentages = exports.validateEqdsBusinessRules = exports.validateEqdsPatient = exports.assertEqdsPatient = exports.getOwners = exports.getBreedingInfo = exports.getColorInfo = exports.getAnimalInfo = exports.getOwnershipTotal = exports.createTestPatient = exports.createPatientFromExample = exports.createEqdsPatient = void 0;
// Types
__exportStar(require("./types"), exports);
// Patient utilities
__exportStar(require("./patient"), exports);
// Validation utilities
__exportStar(require("./validators"), exports);
// Re-export commonly used items for convenience
var patient_1 = require("./patient");
Object.defineProperty(exports, "createEqdsPatient", { enumerable: true, get: function () { return patient_1.createEqdsPatient; } });
Object.defineProperty(exports, "createPatientFromExample", { enumerable: true, get: function () { return patient_1.createPatientFromExample; } });
Object.defineProperty(exports, "createTestPatient", { enumerable: true, get: function () { return patient_1.createTestPatient; } });
Object.defineProperty(exports, "getOwnershipTotal", { enumerable: true, get: function () { return patient_1.getOwnershipTotal; } });
Object.defineProperty(exports, "getAnimalInfo", { enumerable: true, get: function () { return patient_1.getAnimalInfo; } });
Object.defineProperty(exports, "getColorInfo", { enumerable: true, get: function () { return patient_1.getColorInfo; } });
Object.defineProperty(exports, "getBreedingInfo", { enumerable: true, get: function () { return patient_1.getBreedingInfo; } });
Object.defineProperty(exports, "getOwners", { enumerable: true, get: function () { return patient_1.getOwners; } });
var validators_1 = require("./validators");
Object.defineProperty(exports, "assertEqdsPatient", { enumerable: true, get: function () { return validators_1.assertEqdsPatient; } });
Object.defineProperty(exports, "validateEqdsPatient", { enumerable: true, get: function () { return validators_1.validateEqdsPatient; } });
Object.defineProperty(exports, "validateEqdsBusinessRules", { enumerable: true, get: function () { return validators_1.validateEqdsBusinessRules; } });
Object.defineProperty(exports, "validateOwnershipPercentages", { enumerable: true, get: function () { return validators_1.validateOwnershipPercentages; } });
Object.defineProperty(exports, "validateHorseSpecies", { enumerable: true, get: function () { return validators_1.validateHorseSpecies; } });
Object.defineProperty(exports, "validateEqdsProfile", { enumerable: true, get: function () { return validators_1.validateEqdsProfile; } });
// Constants
var types_1 = require("./types");
Object.defineProperty(exports, "EquineSexCodes", { enumerable: true, get: function () { return types_1.EquineSexCodes; } });
Object.defineProperty(exports, "BreedCodes", { enumerable: true, get: function () { return types_1.BreedCodes; } });
Object.defineProperty(exports, "ColorCodes", { enumerable: true, get: function () { return types_1.ColorCodes; } });
Object.defineProperty(exports, "HORSE_SPECIES_CODING", { enumerable: true, get: function () { return types_1.HORSE_SPECIES_CODING; } });
Object.defineProperty(exports, "EQDS_URLS", { enumerable: true, get: function () { return types_1.EQDS_URLS; } });
//# sourceMappingURL=index.js.map