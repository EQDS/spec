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
2. [Scope and Purpose](#scope-and-purpose)
3. [Conformance Requirements](#conformance-requirements)
4. [Resource Profiles](#resource-profiles)
5. [Extensions](#extensions)
6. [Terminologies](#terminologies)
7. [Security Considerations](#security-considerations)
8. [Examples](#examples)
9. [Implementation Notes](#implementation-notes)

---

## Introduction

The FHIR Implementation Guide for Equine Healthcare (Equine Data Standard) defines a set of conformance requirements for systems exchanging equine health information. This guide extends the base FHIR R5 specification to address the unique requirements of equine healthcare, including multi-owner structures, competition records, training data, and breeding information.

### Background

Equine healthcare presents unique challenges not addressed by human or companion animal standards:
- Complex ownership structures with fractional ownership
- Integration of performance and competition data with health records
- Breeding and genetic lineage tracking
- Discipline-specific training and conditioning metrics
- Regulatory requirements for competition and interstate movement

### Relationship to Other Standards

This implementation guide builds upon:
- HL7 FHIR R5 base specification
- SNOMED CT Veterinary Extension (VetSCT)
- AAHA Problem and Diagnosis Terms
- AVMA veterinary informatics standards
- FEI (Fédération Équestre Internationale) competition standards

---

## Scope and Purpose

### Use Cases

1. **Clinical Care**: Recording and sharing veterinary examinations, treatments, and procedures
2. **Competition Management**: Tracking fitness-for-competition, drug withdrawal times, and performance records
3. **Breeding Operations**: Managing reproductive health, genetic testing, and lineage
4. **Training Programs**: Documenting training sessions, conditioning, and performance metrics
5. **Regulatory Compliance**: Supporting Coggins testing, health certificates, and movement tracking

### Out of Scope

- Non-equine species

---

## Conformance Requirements

### Capability Statement

Systems claiming conformance to the Equine Data Standard SHALL:
1. Support the Equine Patient profile
2. Implement at least one exchange paradigm (REST, Documents, or Messaging)
3. Support the required terminologies
4. Implement the security requirements

### Maturity Levels

Resources are assigned maturity levels following FHIR conventions:
- **Level 5 (Normative)**: Patient, Practitioner, Organization
- **Level 3 (Trial Use)**: Observation, Procedure, Condition
- **Level 1 (Draft)**: Training, Competition, Breeding extensions

---

## Resource Profiles

### Equine Patient Profile

**Profile:** EquinePatient  
**Base:** Patient  
**Canonical URL:** https://eqds.org/StructureDefinition/equine-patient

The Equine Patient profile extends the base FHIR Patient resource to include equine-specific information using the standard patient-animal extension.

**Download:** [equine-patient.json](profiles/equine-patient.json)

#### Required Elements

| Element | Cardinality | Type | Description |
|---------|-------------|------|-------------|
| identifier | 1..* | Identifier | Registration number, microchip, or clinic MRN |
| name | 1..* | HumanName | Registered name (use text) and barn name (use given) |
| extension:animal | 1..1 | Extension | Standard FHIR patient-animal extension |
| extension:animal.species | 1..1 | CodeableConcept | Fixed to Horse (SNOMED: 35354009) |
| extension:animal.breed | 1..1 | CodeableConcept | Breed code (binding: EquineBreedValueSet) |
| extension:animal.genderStatus | 1..1 | CodeableConcept | Equine sex (binding: EquineSexValueSet) |
| extension:color | 0..1 | Extension | Color/marking (optional - not all records include) |
| extension:ownership | 0..* | Extension | Ownership structure |
| birthDate | 0..1 | date | Foaling date |

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

| Role | Typical Scopes | Use Case |
|------|----------------|-----------|
| **Owner** | `patient/*.read patient/*.write` | Owner portal for their horses |
| **Trainer** | `patient/Observation.read patient/Procedure.read` | Training barn with multiple horses |
| **Veterinary** | `system/*.read system/*.write` | Clinic managing many patients |
| **Competition Officials** | `patient/Observation.read` | Event-wide fitness checks |
| **Public** | `patient/Patient.read` | Public horse registry lookup |

### Consent Management

Explicit consent required for:
- Sharing records between practices
- Competition drug testing results
- Breeding records
- Insurance claims

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

## Implementation Notes

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

### Batch Operations

Support for bulk operations for common workflows:
- Import entire barn roster
- Submit competition entries for multiple horses
- Update vaccination records for all horses at a facility

### Document Exchange

The specification supports document-based exchange using FHIR Bundle resources for health certificates, competition records, and comprehensive medical records.

---

## Appendices

### A. Canonical URLs Reference

**Base URL:** https://eqds.org

**StructureDefinitions**:
- /StructureDefinition/equine-patient
- /StructureDefinition/equine-observation
- /StructureDefinition/equine-medication-administration
- /StructureDefinition/equine-immunization

**Extensions**:
- /StructureDefinition/ownership
- /StructureDefinition/breeding-info
- /StructureDefinition/equine-color
- /StructureDefinition/withdrawal-time

**CodeSystems**:
- /CodeSystem/equine-sex
- /CodeSystem/breed-codes
- /CodeSystem/color-codes
- /CodeSystem/discipline-codes
- /CodeSystem/competition-orgs

### B. Validation Requirements

All resources and examples in this specification MUST pass validation against:
1. HL7 FHIR R5 base specification
2. Profile constraints defined in this IG
3. Terminology bindings
4. Business rule invariants (e.g., ownership percentages)

### C. Change Log

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-08-27 | Initial release |
| 1.1.0 | 2025-08-28 | Updated for eqds.org domain, improved GitHub Pages structure |

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