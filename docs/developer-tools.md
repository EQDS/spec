---
layout: default
title: Developer Tools - EQDS.org
description: Developer tools and SDKs for implementing the Equine Data Standard
---

# Developer Tools

Welcome to the EQDS developer tools! This page provides access to schemas, SDKs, and resources to help you quickly implement the Equine Data Standard in your applications.


## Navigation

- [**JSON Schemas**](json-schemas) - Generated schemas for all EQDS FHIR profiles
- [**TypeScript SDK**](typescript-sdk) - Type-safe creation and validation
- [**Full Technical Specification**](specification) - Complete FHIR Implementation Guide
- [**Homepage**](index) - Return to EQDS homepage

## Available Tools

<div class="resource-cards">
  <div class="card">
    <h3><a href="json-schemas">JSON Schemas</a></h3>
    <p>Generated JSON Schemas for all EQDS FHIR profiles</p>
    <ul>
      <li>Patient, Observation, Medication, Immunization profiles</li>
      <li>Direct download links for all schemas</li>
      <li>Generated from official FHIR StructureDefinitions</li>
    </ul>
    <p><strong><a href="json-schemas">→ Browse Schemas</a></strong></p>
  </div>

  <div class="card">
    <h3><a href="typescript-sdk">TypeScript SDK</a></h3>
    <p>Complete TypeScript SDK with types and validation</p>
    <ul>
      <li>Type-safe patient creation and validation</li>
      <li>Business rule enforcement (ownership ≈100%, species=Horse)</li>
      <li>Code system constants and utility functions</li>
    </ul>
    <p><strong><a href="typescript-sdk">→ Get Started with TypeScript</a></strong></p>
  </div>
</div>

---

## Quick Start

### JSON Schema Validation

Download any schema and validate your EQDS resources:

```bash
# Download the patient schema
curl -O https://eqds.org/tools/schemas/equine-patient.schema.json

# Use with your favorite JSON Schema validator
ajv validate -s equine-patient.schema.json -d your-patient.json
```

### TypeScript Integration

Use the TypeScript SDK directly in the browser:

```html
<script src="https://eqds.org/tools/sdk/index.js"></script>
<script>
// Create a valid EQDS patient
const patient = createEqdsPatient({
  id: 'horse-1',
  name: 'Thunder',
  genderStatus: 'mare'
});

// Validate the patient
assertEqdsPatient(patient);
console.log('✅ Valid EQDS patient created!');
</script>
```

---

## Key Features

### **Business Rule Validation**
- Ownership percentages must sum to 100% (±0.01% tolerance)
- Patient species automatically set to Horse (SNOMED: 35354009)
- Required extensions and proper canonical URLs enforced

### **Real EQDS Integration**
- Generated from actual FHIR StructureDefinitions in `/profiles/`
- Uses real code systems from `/codesystems/`
- Validates against official examples from `/samples/`

### **Developer-Friendly**
- Type-safe TypeScript interfaces
- Factory functions with sensible defaults
- Comprehensive error messages and validation feedback

---

## Resources

### Official Specification
- [Full EQDS Specification](specification) - Complete FHIR Implementation Guide
- [Example Resources](samples/) - Real-world EQDS examples

### FHIR Resources  
- [Profiles](profiles/) - FHIR StructureDefinitions
- [CodeSystems](codesystems/) - Terminology definitions
- [Extensions](extensions/) - EQDS-specific extensions

### Support
- **GitHub Issues** - Report bugs or request features
- **Email** - equinedatastandard@gmail.com
- **Specification** - Complete technical documentation at [eqds.org/specification](specification)

---

<div class="alert">
  <h4>📢 Coming Soon</h4>
  <p>Additional tools are in development:</p>
  <ul>
    <li><strong>Python SDK</strong> - Pydantic models and validation</li>
    <li><strong>CLI Validator</strong> - Command line validation tool</li>
    <li><strong>Web Playground</strong> - Interactive JSON validation and generation</li>
  </ul>
</div>

---

*These tools are automatically generated from the official EQDS FHIR profiles and stay synchronized with the specification.*