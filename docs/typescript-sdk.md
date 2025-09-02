---
layout: default
title: TypeScript SDK - EQDS
description: TypeScript SDK for the Equine Data Standard with types and validation
---

# TypeScript SDK

The EQDS TypeScript SDK provides type-safe creation and validation of EQDS FHIR resources with built-in business rule enforcement.

## Navigation

- [**Developer Tools**](developer-tools) - Main developer tools hub
- [**JSON Schemas**](json-schemas) - Generated schemas for validation
- [**Full Technical Specification**](specification) - Complete FHIR Implementation Guide
- [**Homepage**](index) - Return to EQDS homepage


## Quick Start

### Browser Usage (CDN)

```html
<script src="https://eqds.org/tools/sdk/index.js"></script>
<script>
// Create a valid EQDS patient
const patient = createEqdsPatient({
  id: 'horse-123',
  name: 'Thunder Strike',
  genderStatus: 'mare',
  breed: 'QH', // Quarter Horse
  owners: [
    { reference: 'RelatedPerson/owner-1', percentage: 100 }
  ]
});

// Validate the patient
assertEqdsPatient(patient);
console.log('✅ Valid EQDS patient!', patient);
</script>
```

### Download Files

Direct download links for TypeScript SDK files:

<div class="resource-cards">
  <div class="card">
    <h3>📦 Core Files</h3>
    <ul>
      <li><a href="tools/sdk/index.js" download><strong>index.js</strong></a> - Main SDK bundle</li>
      <li><a href="tools/sdk/index.d.ts" download><strong>index.d.ts</strong></a> - TypeScript definitions</li>
      <li><a href="tools/sdk/patient.js" download><strong>patient.js</strong></a> - Patient utilities</li>
      <li><a href="tools/sdk/validators.js" download><strong>validators.js</strong></a> - Validation functions</li>
    </ul>
  </div>
  <div class="card">
    <h3>🔧 Additional Files</h3>
    <ul>
      <li><a href="tools/sdk/types.js" download><strong>types.js</strong></a> - Type definitions and constants</li>
      <li><a href="tools/sdk/patient.d.ts" download><strong>patient.d.ts</strong></a> - Patient TypeScript types</li>
      <li><a href="tools/sdk/validators.d.ts" download><strong>validators.d.ts</strong></a> - Validator types</li>
      <li><a href="tools/sdk/types.d.ts" download><strong>types.d.ts</strong></a> - Core types</li>
    </ul>
  </div>
</div>

---

## Features

### ✅ **Type Safety**
Complete TypeScript types generated from FHIR StructureDefinitions:

```javascript
// Strongly typed parameters
const patient = createEqdsPatient({
  id: string,                    // Required
  name: string,                  // Required  
  genderStatus: EquineSex,       // 'mare' | 'stallion' | 'gelding' | 'colt' | 'filly'
  breed?: BreedCode,             // 'QH' | 'TB' | 'AR' | 'PT' | 'AP' | 'WB'
  color?: ColorCode,             // 'bay' | 'chestnut' | 'black' | etc.
  owners?: Array<{               // Optional ownership
    reference: string,
    percentage: number
  }>,
  // ... more options
});
```

### ✅ **Business Rule Validation**

Automatic enforcement of EQDS business rules:

```javascript
// ❌ This will throw an error
try {
  createEqdsPatient({
    id: 'invalid-horse',
    name: 'Invalid Horse',
    genderStatus: 'mare',
    owners: [
      { reference: 'Owner/1', percentage: 60 },
      { reference: 'Owner/2', percentage: 25 } // Only 85% total!
    ]
  });
} catch (error) {
  console.log('❌', error.message); 
  // "Ownership percentages must sum to approximately 100%, got 85%"
}

// ✅ This will work
const validPatient = createEqdsPatient({
  id: 'valid-horse',
  name: 'Valid Horse', 
  genderStatus: 'stallion',
  owners: [
    { reference: 'Owner/1', percentage: 75 },
    { reference: 'Owner/2', percentage: 25 }  // Sums to 100%
  ]
});
```

### ✅ **Code System Integration**

Uses actual EQDS CodeSystems with constants:

```javascript
// Available breed codes from EQDS CodeSystem
console.log(BreedCodes.QH);  // { code: "QH", display: "Quarter Horse" }
console.log(BreedCodes.TB);  // { code: "TB", display: "Thoroughbred" }

// Available equine sex codes  
console.log(EquineSexCodes.mare);     // { code: "mare", display: "Mare" }
console.log(EquineSexCodes.stallion); // { code: "stallion", display: "Stallion" }

// Color codes
console.log(ColorCodes.bay);      // { code: "bay", display: "Bay" }
console.log(ColorCodes.palomino); // { code: "pal", display: "Palomino" }
```

---

## API Reference

### Factory Functions

#### `createEqdsPatient(params)`
Creates a valid EQDS Patient resource with automatic defaults:

```javascript
const patient = createEqdsPatient({
  id: 'horse-1',
  name: 'Example Horse',
  barnName: 'Nickname',           // Optional: goes in name.given
  genderStatus: 'mare',           // Required: from EQDS equine-sex CodeSystem
  breed: 'QH',                    // Optional: from EQDS breed-codes CodeSystem  
  color: 'bay',                   // Optional: from EQDS color-codes CodeSystem
  birthDate: '2020-04-15',        // Optional: ISO date
  owners: [...],                  // Optional: must sum to ≈100%
  sire: 'Father Horse',           // Optional: breeding info
  dam: 'Mother Horse',            // Optional: breeding info
  identifiers: [...]              // Optional: additional identifiers
});
```

#### `createPatientFromExample()`
Creates the patient from the official EQDS example:

```javascript
const examplePatient = createPatientFromExample();
// Returns "Smart Little Pepto" with 60/40 ownership split
```

#### `createTestPatient(id, genderStatus, breed?)`
Quick test patient creation:

```javascript
const testPatient = createTestPatient('test-1', 'stallion', 'TB');
```

### Validation Functions

#### `assertEqdsPatient(obj)`
Type guard that throws if invalid:

```javascript
assertEqdsPatient(patient); // Throws detailed error if invalid
```

#### `validateEqdsPatient(obj)`
Non-throwing validation:

```javascript
const result = validateEqdsPatient(patient);
if (!result.valid) {
  console.log('Errors:', result.errors);
}
```

#### `validateEqdsBusinessRules(patient)`
Validates EQDS-specific business rules:

```javascript
const validation = validateEqdsBusinessRules(patient);
console.log('Valid:', validation.valid);
console.log('Errors:', validation.errors);
```

### Utility Functions

#### `getOwnershipTotal(patient)`
Returns total ownership percentage:

```javascript
const total = getOwnershipTotal(patient); // 100
```

#### `getAnimalInfo(patient)`  
Extracts animal extension data:

```javascript
const info = getAnimalInfo(patient);
console.log(info.species.display);     // "Horse (organism)"
console.log(info.genderStatus.code);   // "mare"
console.log(info.breed?.display);      // "Quarter Horse"
```

#### `getOwners(patient)`
Gets all owners with percentages:

```javascript
const owners = getOwners(patient);
// [{ reference: "Owner/1", percentage: 60 }, ...]
```

---

## Examples

### Complete Patient Creation

```javascript
// Create a comprehensive EQDS patient
const comprehensivePatient = createEqdsPatient({
  id: 'comprehensive-example',
  name: 'Thunder Bay Champion',
  barnName: 'Thunder',
  genderStatus: 'stallion',
  breed: 'TB',              // Thoroughbred
  color: 'bay',
  birthDate: '2018-04-15',
  owners: [
    { reference: 'Organization/racing-stable', percentage: 60 },
    { reference: 'RelatedPerson/private-owner', percentage: 40 }
  ],
  sire: 'Famous Racing Stallion',
  dam: 'Champion Mare',
  identifiers: [
    { 
      system: 'http://jockey-club.com/registration', 
      value: 'JC123456',
      type: 'Jockey Club Registration'
    },
    { 
      system: 'http://icar.org/microchip', 
      value: '985141405208421',
      type: 'Microchip'
    }
  ]
});

// Validate the result
assertEqdsPatient(comprehensivePatient);
console.log('✅ Comprehensive patient created successfully!');
```

### Working with Existing Data

```javascript
// Validate existing JSON data
const existingData = {
  resourceType: 'Patient',
  id: 'existing-horse',
  // ... your existing patient data
};

// Check if it's EQDS compliant
const validation = validateEqdsPatient(existingData);
if (validation.valid) {
  console.log('✅ Existing data is EQDS compliant!');
} else {
  console.log('❌ Validation errors:', validation.errors);
}
```

---

## Constants and Types

### Available Types
- `EqdsPatient` - Complete patient interface
- `EquineSex` - Union type of valid sex codes
- `BreedCode` - Union type of valid breed codes  
- `ColorCode` - Union type of valid color codes
- `CreatePatientParams` - Factory function parameters

### Code System Constants
- `EquineSexCodes` - All equine sex codes with displays
- `BreedCodes` - All breed codes with displays
- `ColorCodes` - All color codes with displays
- `EQDS_URLS` - Canonical URLs for EQDS resources

---

## Advanced Usage

### Custom Validation

```javascript
// Combine with your own validation
function validateMyPatient(patient) {
  // First, validate EQDS compliance
  const eqdsValidation = validateEqdsPatient(patient);
  if (!eqdsValidation.valid) {
    return eqdsValidation;
  }
  
  // Then add your custom rules
  const errors = [];
  if (patient.birthDate && new Date(patient.birthDate) > new Date()) {
    errors.push('Birth date cannot be in the future');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

### Extending Patients

```javascript
// Start with EQDS compliance, then add custom data
const basePatient = createEqdsPatient({
  id: 'extended-horse',
  name: 'Extended Example',
  genderStatus: 'mare'
});

// Add your custom extensions (be careful not to break EQDS compliance!)
const extendedPatient = {
  ...basePatient,
  // Add custom properties that don't conflict with EQDS
  customField: 'my custom data'
};

// Still validates as EQDS compliant
assertEqdsPatient(extendedPatient);
```

---

*This SDK is automatically generated from the official EQDS FHIR StructureDefinitions and stays synchronized with the specification.*