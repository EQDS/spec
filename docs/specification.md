---
layout: default
title: Full Specification - EQDS
description: Complete FHIR Implementation Guide for Equine Healthcare
---

# FHIR Implementation Guide for Equine Healthcare (Equine Data Standard)

**Version:** 1.1.0  
**Status:** Draft  
**Date:** 2025-08-27  
**Publisher:** Equine Data Standard (EQDS)  
**Contact:** equinedatastandard@gmail.com  
**Website:** https://eqds.org  
**License:** CC0-1.0  

## Table of Contents

1. [Introduction](#introduction)
2. [Conformance Requirements](#conformance-requirements)
3. [Resource Profiles](#resource-profiles)
4. [Extensions](#extensions)
5. [Terminologies](#terminologies)
6. [Value Sets](#value-sets)
7. [Security Considerations](#security-considerations)
8. [Exchange Rules](#exchange-rules)
9. [Examples](#examples)
10. [Implementation Guidance](#implementation-guidance)
11. [Appendices](#appendices)

---

## Introduction

This is the complete technical specification for the Equine Data Standard (EQDS). For background information, use cases, and audience details, please see the [EQDS homepage](index).

This Implementation Guide defines conformance requirements for systems exchanging equine health information using HL7® FHIR® R5. It specifies profiles, extensions, terminologies, and exchange patterns specifically designed for equine healthcare interoperability.

### Out of Scope

- Non-equine species

---

## Conformance Requirements

<div class="resource-cards">
  <div class="card">
    <h3>Capability Statement - Conformance Requirements</h3>
    <p>Systems claiming conformance to the Equine Data Standard SHALL:</p>
    <ul>
      <li>Support the Equine Patient profile</li>
      <li>Implement at least one exchange paradigm (REST, Documents, or Messaging)</li>
      <li>Support the required terminologies</li>
      <li>Implement the security requirements</li>
    </ul>
  </div>

  <div class="card">
    <h3>Maturity Levels</h3>
    <p>Resources are assigned maturity levels following FHIR conventions:</p>
    <ul>
      <li><strong>Level 5 (Normative)</strong> - Patient, Practitioner, Organization</li>
      <li><strong>Level 3 (Trial Use)</strong> - Observation, Procedure, Condition</li>
      <li><strong>Level 1 (Draft)</strong> - Training, Competition, Breeding extensions</li>
    </ul>
  </div>
</div>

---

## Resource Profiles

### Equine Patient Profile

**Profile:** EquinePatient  
**Base:** Patient  
**Canonical URL:** https://eqds.org/StructureDefinition/equine-patient

The Equine Patient profile extends the base FHIR Patient resource to include equine-specific information using the standard patient-animal extension.

**Download:** [equine-patient.json](profiles/equine-patient.json)

#### Required Elements

<div class="table-responsive">
<table>
<thead>
<tr>
<th>Element</th>
<th>Cardinality</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>identifier</td>
<td>1..*</td>
<td>Identifier</td>
<td>Registration number, microchip, or clinic MRN</td>
</tr>
<tr>
<td>name</td>
<td>1..*</td>
<td>HumanName</td>
<td>Registered name (use text) and barn name (use given)</td>
</tr>
<tr>
<td>extension:animal</td>
<td>1..1</td>
<td>Extension</td>
<td>Standard FHIR patient-animal extension</td>
</tr>
<tr>
<td>extension:animal.species</td>
<td>1..1</td>
<td>CodeableConcept</td>
<td>Fixed to Horse (SNOMED: 35354009)</td>
</tr>
<tr>
<td>extension:animal.breed</td>
<td>1..1</td>
<td>CodeableConcept</td>
<td>Breed code (binding: EquineBreedValueSet)</td>
</tr>
<tr>
<td>extension:animal.genderStatus</td>
<td>1..1</td>
<td>CodeableConcept</td>
<td>Equine sex (binding: EquineSexValueSet)</td>
</tr>
<tr>
<td>extension:color</td>
<td>0..1</td>
<td>Extension</td>
<td>Color/marking (optional - not all records include)</td>
</tr>
<tr>
<td>extension:ownership</td>
<td>0..*</td>
<td>Extension</td>
<td>Ownership structure</td>
</tr>
<tr>
<td>birthDate</td>
<td>0..1</td>
<td>date</td>
<td>Foaling date</td>
</tr>
</tbody>
</table>
</div>

**Naming Convention**: 
- `name.text`: Full registered name
- `name.given[0]`: Barn name or call name
- `name.use`: "official" for registered, "nickname" for barn name

<div class="resource-cards">
  <div class="card">
    <h3>Profiles - Core Resources</h3>
    <ul>
      <li><a href="profiles/equine-patient.json">Equine Patient</a> - Complete patient profile with equine-specific extensions</li>
      <li><a href="profiles/equine-observation.json">Equine Observation</a> - Clinical observations, training metrics, and competition performance</li>
      <li><a href="profiles/equine-medication-administration.json">Equine Medication Administration</a> - Medications with competition withdrawal times</li>
      <li><a href="profiles/equine-immunization.json">Equine Immunization</a> - Vaccinations and immunizations</li>
      <li><a href="profiles/equine-procedure.json">Equine Procedure</a> - Veterinary procedures</li>
      <li><a href="profiles/equine-practitioner.json">Equine Practitioner</a> - Veterinary practitioners</li>
      <li><a href="profiles/equine-organization.json">Equine Organization</a> - Clinics, facilities, and venues</li>
    </ul>
  </div>
</div>

---

## Extensions

<div class="resource-cards">
  <div class="card">
    <h3>Extensions - Equine-Specific Data</h3>
    <ul>
      <li><a href="extensions/ownership.json">Ownership</a> - Tracks fractional ownership with percentages</li>
      <li><a href="extensions/breeding-info.json">Breeding Info</a> - Sire and dam information</li>
      <li><a href="extensions/equine-color.json">Equine Color</a> - Color and markings</li>
      <li><a href="extensions/withdrawal-time.json">Withdrawal Time</a> - Competition drug withdrawal times</li>
      <li><a href="extensions/next-due.json">Next Due</a> - Vaccination schedule tracking</li>
    </ul>
  </div>
</div>

The Ownership Extension supports fractional ownership with validation that ownership percentages should sum to 100% (±0.01% tolerance).

---

## Terminologies

<div class="resource-cards">
  <div class="card">
    <h3>Code Systems - Terminologies</h3>
    <p>All code systems use the eqds.org domain as the canonical URL:</p>
    <ul>
      <li><a href="codesystems/equine-sex.json">Equine Sex</a> - Mare, stallion, gelding, colt, filly</li>
      <li><a href="codesystems/breed-codes.json">Breed Codes</a> - Quarter Horse, Thoroughbred, Arabian, etc.</li>
      <li><a href="codesystems/color-codes.json">Color Codes</a> - Bay, chestnut, palomino, etc.</li>
      <li><a href="codesystems/discipline-codes.json">Discipline Codes</a> - Reining, dressage, jumping, etc.</li>
      <li><a href="codesystems/competition-orgs.json">Competition Organizations</a> - FEI, USEF, NRHA, etc.</li>
      <li><a href="codesystems/veterinary-medications.json">Veterinary Medications</a> - Common equine medications</li>
    </ul>
  </div>
</div>

---

## Value Sets

<div class="resource-cards">
  <div class="card">
    <h3>Value Sets</h3>
    <ul>
      <li><a href="valuesets/equine-sex.json">Equine Sex ValueSet</a></li>
      <li><a href="valuesets/breed-codes.json">Breed Codes ValueSet</a></li>
      <li><a href="valuesets/competition-organizations.json">Competition Organizations ValueSet</a></li>
    </ul>
  </div>
</div>

---

## Security Considerations

### Access Control

Implementation SHALL use OAuth 2.0 with SMART-on-FHIR for authentication and authorization.

#### Scopes and Roles

<div class="table-responsive">
<table>
<thead>
<tr>
<th>Role</th>
<th>Typical Scopes</th>
<th>Use Case</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Owner</strong></td>
<td><code>patient/*.read patient/*.write</code></td>
<td>Owner portal for their horses</td>
</tr>
<tr>
<td><strong>Trainer</strong></td>
<td><code>patient/Observation.read patient/Procedure.read</code></td>
<td>Training barn with multiple horses</td>
</tr>
<tr>
<td><strong>Veterinary</strong></td>
<td><code>system/*.read system/*.write</code></td>
<td>Clinic managing many patients</td>
</tr>
<tr>
<td><strong>Competition Officials</strong></td>
<td><code>patient/Observation.read</code></td>
<td>Event-wide fitness checks</td>
</tr>
<tr>
<td><strong>Public</strong></td>
<td><code>patient/Patient.read</code></td>
<td>Public horse registry lookup</td>
</tr>
</tbody>
</table>
</div>

<div class="resource-cards">
  <div class="card">
    <h3>Consent Management</h3>
    <p>Explicit consent required for:</p>
    <ul>
      <li>Sharing records between practices</li>
      <li>Competition drug testing results</li>
      <li>Breeding records</li>
      <li>Insurance claims</li>
    </ul>
  </div>
</div>

---

## Exchange Rules

### RESTful API

#### Search Parameters

<div class="resource-cards">
  <div class="card">
    <h3>Search Parameters</h3>
    <ul>
      <li><a href="searchparameters/patient-breed.json">Breed Search</a> - Search patients by breed</li>
      <li><a href="searchparameters/patient-microchip.json">Microchip Search</a> - Search by microchip identifier</li>
      <li><a href="searchparameters/patient-owner.json">Owner Search</a> - Search by owner reference</li>
    </ul>
  </div>
</div>

Example searches:
```
GET [base]/Patient?breed=QH&owner=RelatedPerson/123
GET [base]/Patient?microchip=985141405208421
GET [base]/Observation?subject=Patient/horse-123&category=training
```

<div class="resource-cards">
  <div class="card">
    <h3>Batch Operations</h3>
    <p>Support for bulk operations for common workflows:</p>
    <ul>
      <li>Import entire barn roster</li>
      <li>Submit competition entries for multiple horses</li>
      <li>Update vaccination records for all horses at a facility</li>
    </ul>
  </div>
</div>

### Document Exchange

The specification supports document-based exchange using FHIR Bundle resources for health certificates, competition records, and comprehensive medical records.

---

## Examples

<div class="resource-cards">
  <div class="card">
    <h3>Examples - Implementation Samples</h3>
    <ul>
      <li><a href="samples/patient-example.json">Patient Example</a> - Complete equine patient record with ownership and breeding information</li>
      <li><a href="samples/observation-lameness.json">Lameness Observation</a> - AAEP lameness grading example</li>
      <li><a href="samples/observation-competition.json">Competition Score</a> - Reining pattern score with maneuver breakdown</li>
      <li><a href="samples/observation-training.json">Training Session</a> - Training activity documentation</li>
      <li><a href="samples/observation-height.json">Height Measurement</a> - Body height in hands and centimeters</li>
      <li><a href="samples/immunization-example.json">Vaccination Record</a> - Equine influenza vaccination</li>
      <li><a href="samples/coggins-test.json">Coggins Test</a> - EIA test diagnostic report</li>
      <li><a href="samples/medication-administration.json">Medication Administration</a> - Phenylbutazone with USEF withdrawal time</li>
    </ul>
  </div>
</div>

---

## Implementation Guidance

### Best Practices

<div class="resource-cards">
  <div class="card">
    <h3>Implementation Recommendations</h3>
    <ul>
      <li><strong>Patient Identity</strong> - Always include microchip identifier when available for reliable matching</li>
      <li><strong>Ownership Tracking</strong> - Use the ownership extension to maintain current and historical ownership records</li>
      <li><strong>Competition Data</strong> - Link competition observations to specific events and organizations</li>
      <li><strong>Medication Tracking</strong> - Always include withdrawal times for competition-relevant medications</li>
      <li><strong>Training Records</strong> - Use consistent observation categories and coding for training metrics</li>
    </ul>
  </div>
</div>

### Data Quality Guidelines

<div class="resource-cards">
  <div class="card">
    <h3>Data Quality Requirements</h3>
    <ul>
      <li><strong>Identifiers</strong> - Validate registration numbers against breed registry formats</li>
      <li><strong>Dates</strong> - Use precise dates for vaccinations, procedures, and competition events</li>
      <li><strong>Terminologies</strong> - Prefer coded values over free text where value sets exist</li>
      <li><strong>References</strong> - Maintain referential integrity between related resources</li>
    </ul>
  </div>
</div>

---

## Appendices

### A. Canonical URLs Reference

<div class="resource-cards">
  <div class="card">
    <h3>StructureDefinitions</h3>
    <p><strong>Base URL:</strong> https://eqds.org</p>
    <ul>
      <li>/StructureDefinition/equine-patient</li>
      <li>/StructureDefinition/equine-observation</li>
      <li>/StructureDefinition/equine-medication-administration</li>
      <li>/StructureDefinition/equine-immunization</li>
    </ul>
  </div>

  <div class="card">
    <h3>Extensions</h3>
    <p><strong>Base URL:</strong> https://eqds.org</p>
    <ul>
      <li>/StructureDefinition/ownership</li>
      <li>/StructureDefinition/breeding-info</li>
      <li>/StructureDefinition/equine-color</li>
      <li>/StructureDefinition/withdrawal-time</li>
    </ul>
  </div>

  <div class="card">
    <h3>CodeSystems</h3>
    <p><strong>Base URL:</strong> https://eqds.org</p>
    <ul>
      <li>/CodeSystem/equine-sex</li>
      <li>/CodeSystem/breed-codes</li>
      <li>/CodeSystem/color-codes</li>
      <li>/CodeSystem/discipline-codes</li>
      <li>/CodeSystem/competition-orgs</li>
    </ul>
  </div>
</div>

### B. Validation Requirements

<div class="resource-cards">
  <div class="card">
    <h3>Validation Requirements</h3>
    <p>All resources and examples in this specification MUST pass validation against:</p>
    <ul>
      <li>HL7 FHIR R5 base specification</li>
      <li>Profile constraints defined in this IG</li>
      <li>Terminology bindings</li>
      <li>Business rule invariants (e.g., ownership percentages)</li>
    </ul>
  </div>
</div>

### C. Change Log

<div class="table-responsive">
<table>
<thead>
<tr>
<th>Version</th>
<th>Date</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>1.0.0</td>
<td>2025-08-27</td>
<td>Initial release</td>
</tr>
<tr>
<td>1.1.0</td>
<td>2025-08-28</td>
<td>Updated for eqds.org domain, improved GitHub Pages structure</td>
</tr>
</tbody>
</table>
</div>

### D. Contributors

- Andy Baird - Founder and Lead Developer

---

## License

This Implementation Guide is published under Creative Commons CC0 1.0 Universal license, allowing unrestricted use, distribution, and reproduction.

---

## Contact

For questions, feedback, or contributions:
- Email: equinedatastandard@gmail.com
- Website: https://eqds.org
- GitHub: https://github.com/EQDS

---

*This specification is a living document and will be updated based on implementation experience and community feedback.*