---
layout: default
title: JSON Schemas - EQDS
description: JSON Schemas generated from EQDS FHIR StructureDefinitions
---

# JSON Schemas 

JSON Schemas for all EQDS FHIR profiles, automatically generated from the official StructureDefinitions. Use these schemas to validate your EQDS resources with any JSON Schema validator.

## Navigation

- [**Developer Tools**](developer-tools) - Main developer tools hub
- [**TypeScript SDK**](typescript-sdk) - Type-safe creation and validation
- [**Full Technical Specification**](specification) - Complete FHIR Implementation Guide
- [**Homepage**](index) - Return to EQDS homepage

## Available Schemas

<div class="resource-cards">
  <div class="card">
    <h3>Core Resources</h3>
    <ul>
      <li><a href="tools/schemas/equine-patient.schema.json" download><strong>Equine Patient</strong></a> - Complete patient profile with equine extensions</li>
      <li><a href="tools/schemas/equine-observation.schema.json" download><strong>Equine Observation</strong></a> - Clinical observations and training metrics</li>
      <li><a href="tools/schemas/equine-procedure.schema.json" download><strong>Equine Procedure</strong></a> - Veterinary procedures</li>
    </ul>
  </div>

  <div class="card">
    <h3>Medical Resources</h3>
    <ul>
      <li><a href="tools/schemas/equine-medication-administration.schema.json" download><strong>Medication Administration</strong></a> - Medications with withdrawal times</li>
      <li><a href="tools/schemas/equine-immunization.schema.json" download><strong>Equine Immunization</strong></a> - Vaccinations and immunizations</li>
    </ul>
  </div>

  <div class="card">
    <h3>People & Organizations</h3>
    <ul>
      <li><a href="tools/schemas/equine-practitioner.schema.json" download><strong>Equine Practitioner</strong></a> - Veterinary practitioners</li>
      <li><a href="tools/schemas/equine-organization.schema.json" download><strong>Equine Organization</strong></a> - Clinics, facilities, and venues</li>
    </ul>
  </div>
</div>

---

## Usage Examples

### Command Line Validation

Using [ajv-cli](https://github.com/ajv-validator/ajv-cli):

```bash
# Install ajv-cli globally
npm install -g ajv-cli

# Download a schema
curl -O https://eqds.org/tools/schemas/equine-patient.schema.json

# Validate your JSON against the schema
ajv validate -s equine-patient.schema.json -d your-patient.json
```

### Node.js Validation

```javascript
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Initialize AJV with format support
const ajv = new Ajv();
addFormats(ajv);

// Load the schema
const schema = require('./equine-patient.schema.json');
const validate = ajv.compile(schema);

// Validate your data
const patientData = {
  resourceType: 'Patient',
  id: 'test-horse',
  // ... your patient data
};

const valid = validate(patientData);
if (!valid) {
  console.log('Validation errors:', validate.errors);
} else {
  console.log('✅ Valid EQDS patient!');
}
```

### Python Validation

```python
import json
import jsonschema
import requests

# Download and load the schema
schema_url = 'https://eqds.org/tools/schemas/equine-patient.schema.json'
schema = requests.get(schema_url).json()

# Your patient data
patient_data = {
    "resourceType": "Patient", 
    "id": "test-horse",
    # ... your patient data
}

# Validate
try:
    jsonschema.validate(patient_data, schema)
    print("✅ Valid EQDS patient!")
except jsonschema.ValidationError as e:
    print(f"❌ Validation error: {e.message}")
```

### Browser Validation

```html
<script src="https://cdn.jsdelivr.net/npm/ajv@8.12.0/dist/ajv.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ajv-formats@2.1.1/dist/ajv-formats.min.js"></script>

<script>
// Initialize AJV
const ajv = new Ajv();
addFormats(ajv);

// Load schema (fetch from your server or embed)
fetch('https://eqds.org/tools/schemas/equine-patient.schema.json')
  .then(response => response.json())
  .then(schema => {
    const validate = ajv.compile(schema);
    
    // Your patient data
    const patientData = {
      resourceType: 'Patient',
      id: 'browser-test',
      // ... your patient data
    };
    
    // Validate
    const valid = validate(patientData);
    if (valid) {
      console.log('✅ Valid EQDS patient!');
    } else {
      console.log('❌ Validation errors:', validate.errors);
    }
  });
</script>
```

---

## Schema Details

### Equine Patient Schema

The most comprehensive schema includes:

#### **Required Elements**
- `resourceType: "Patient"`
- `identifier[]` - At least one identifier (MRN, registration, microchip)
- `name[]` - At least one name (registered name, barn name)
- `extension[]` - Must include animal extension

#### **Animal Extension (Required)**
- `species` - Fixed to Horse (SNOMED: 35354009)
- `breed` - From EQDS breed codes (QH, TB, AR, etc.)
- `genderStatus` - From EQDS equine-sex codes (mare, stallion, gelding, colt, filly)

#### **Optional Extensions**
- `ownership` - Multiple ownership with percentages (must sum to ≈100%)
- `equine-color` - Color and markings
- `breeding-info` - Sire and dam information

#### **Business Rules Enforced**
- Ownership percentages must sum to 100% (±0.01% tolerance)
- Species must be Horse
- Gender status must use EQDS equine-sex codes
- Required extensions must be present

### Schema Generation

All schemas are automatically generated from the official FHIR StructureDefinitions in `/profiles/` using our schema generator:

```bash
# How schemas are generated (for reference)
cd tools/schema-generator
npm run generate

# Output: 7 JSON Schema files in tools/eqds-schemas/schemas/
```

---

## Canonical URLs

Each schema includes the proper canonical URLs from the EQDS specification:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://eqds.org/schemas/equine-patient.schema.json",
  "title": "Equine Patient Profile",
  "description": "JSON Schema for Equine Patient Profile"
}
```

### EQDS URLs Reference
- **Profile URL**: `https://eqds.org/StructureDefinition/equine-patient`
- **Extensions**: `https://eqds.org/StructureDefinition/ownership`
- **CodeSystems**: `https://eqds.org/CodeSystem/equine-sex`
- **Schema URL**: `https://eqds.org/schemas/equine-patient.schema.json`

---

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Validate EQDS Resources

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install validator
        run: npm install -g ajv-cli
        
      - name: Download EQDS schemas
        run: |
          curl -O https://eqds.org/tools/schemas/equine-patient.schema.json
          curl -O https://eqds.org/tools/schemas/equine-observation.schema.json
          
      - name: Validate patient resources
        run: ajv validate -s equine-patient.schema.json -d "data/patients/*.json"
        
      - name: Validate observation resources  
        run: ajv validate -s equine-observation.schema.json -d "data/observations/*.json"
```

### Docker Validation

```dockerfile
FROM node:18-alpine

# Install ajv-cli
RUN npm install -g ajv-cli

# Download EQDS schemas
RUN curl -O https://eqds.org/tools/schemas/equine-patient.schema.json

# Copy your data
COPY data/ /data/

# Validate
CMD ["ajv", "validate", "-s", "equine-patient.schema.json", "-d", "/data/*.json"]
```

---

## Schema Comparison

| Feature | FHIR Base Patient | EQDS Equine Patient |
|---------|-------------------|---------------------|
| Species | Any | Fixed: Horse (SNOMED: 35354009) |
| Gender | FHIR admin gender | Equine-specific (mare, stallion, etc.) |
| Ownership | Not supported | Multi-owner with percentages |
| Breed | Not supported | EQDS breed codes (QH, TB, AR, etc.) |
| Color | Not supported | EQDS color codes |
| Breeding | Not supported | Sire/dam tracking |
| Business Rules | Basic FHIR | Ownership ≈100%, species validation |

---

## Troubleshooting

### Common Validation Errors

#### Missing Required Extension
```json
// ❌ Error: Missing animal extension
{
  "resourceType": "Patient",
  "id": "test",
  "identifier": [{"value": "123"}],
  "name": [{"text": "Horse"}]
  // Missing extension array!
}
```

#### Invalid Species
```json
// ❌ Error: Wrong species
{
  "extension": [{
    "url": "http://hl7.org/fhir/StructureDefinition/patient-animal",
    "extension": [{
      "url": "species",
      "valueCodeableConcept": {
        "coding": [{
          "system": "http://snomed.info/sct",
          "code": "448771007",  // ❌ This is "Dog", not Horse
          "display": "Dog (organism)"
        }]
      }
    }]
  }]
}
```

#### Invalid Ownership Total
```json
// ❌ Error: Ownership doesn't sum to 100%
{
  "extension": [
    // ... animal extension ...
    {
      "url": "https://eqds.org/StructureDefinition/ownership",
      "extension": [
        {"url": "owner", "valueReference": {"reference": "Owner/1"}},
        {"url": "percentage", "valueDecimal": 85.0} // ❌ Only 85%!
      ]
    }
  ]
}
```

### Getting Help

If you encounter validation issues:

1. **Check the error message** - JSON Schema validators provide detailed error paths
2. **Review the examples** in [/samples/](samples/) 
3. **Compare with working examples** from the [TypeScript SDK](typescript-sdk)
4. **Contact support** at equinedatastandard@gmail.com

---

*These schemas are automatically generated from the official EQDS FHIR StructureDefinitions and stay synchronized with the specification.*