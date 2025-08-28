# FHIR Implementation Guide for Equine Healthcare (Equine Data Standard)

**Version:** 1.1.0  
**Status:** Draft  
**Date:** 2025-08-27  
**Publisher:** Equine Data Standard Initiative  
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

- Financial transactions (billing, insurance)
- Practice management operations
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

### Other Profiles

- **[Equine Observation](profiles/equine-observation.json)** - Clinical observations, training metrics, and competition performance
- **[Equine Medication Administration](profiles/equine-medication-administration.json)** - Medications with competition withdrawal times  
- **[Equine Immunization](profiles/equine-immunization.json)** - Vaccinations and immunizations
- **[Equine Procedure](profiles/equine-procedure.json)** - Veterinary procedures
- **[Equine Practitioner](profiles/equine-practitioner.json)** - Veterinary practitioners
- **[Equine Organization](profiles/equine-organization.json)** - Clinics, facilities, and venues

---

## Extensions

### Core Extensions

1. **[Ownership](extensions/ownership.json)** - Tracks fractional ownership with percentages
2. **[Breeding Info](extensions/breeding-info.json)** - Sire and dam information
3. **[Equine Color](extensions/equine-color.json)** - Color and markings
4. **[Withdrawal Time](extensions/withdrawal-time.json)** - Competition drug withdrawal times
5. **[Next Due](extensions/next-due.json)** - Vaccination schedule tracking

The Ownership Extension supports fractional ownership with validation that ownership percentages should sum to 100% (±0.01% tolerance).

---

## Terminologies

### Required Code Systems

All code systems use the eqds.org domain as the canonical URL:

- **[Equine Sex](codesystems/equine-sex.json)** - Mare, stallion, gelding, colt, filly
- **[Breed Codes](codesystems/breed-codes.json)** - Quarter Horse, Thoroughbred, Arabian, etc.
- **[Color Codes](codesystems/color-codes.json)** - Bay, chestnut, palomino, etc.
- **[Discipline Codes](codesystems/discipline-codes.json)** - Reining, dressage, jumping, etc.
- **[Competition Organizations](codesystems/competition-orgs.json)** - FEI, USEF, NRHA, etc.
- **[Veterinary Medications](codesystems/veterinary-medications.json)** - Common equine medications

### Value Sets

- **[Equine Sex ValueSet](valuesets/equine-sex.json)**
- **[Breed Codes ValueSet](valuesets/breed-codes.json)**
- **[Competition Organizations ValueSet](valuesets/competition-organizations.json)**

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

### Complete Examples

- **[Patient Example](samples/patient-example.json)** - Complete equine patient record with ownership and breeding information
- **[Lameness Observation](samples/observation-lameness.json)** - AAEP lameness grading example
- **[Competition Score](samples/observation-competition.json)** - Reining pattern score with maneuver breakdown
- **[Training Session](samples/observation-training.json)** - Training activity documentation
- **[Height Measurement](samples/observation-height.json)** - Body height in hands and centimeters
- **[Vaccination Record](samples/immunization-example.json)** - Equine influenza vaccination
- **[Coggins Test](samples/coggins-test.json)** - EIA test diagnostic report
- **[Medication Administration](samples/medication-administration.json)** - Phenylbutazone with USEF withdrawal time

---

## Implementation Notes

### RESTful API

#### Search Parameters

- **[Breed Search](searchparameters/patient-breed.json)** - Search patients by breed
- **[Microchip Search](searchparameters/patient-microchip.json)** - Search by microchip identifier
- **[Owner Search](searchparameters/patient-owner.json)** - Search by owner reference

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

- Andy Baird - Creator and Lead Developer

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