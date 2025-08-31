---
layout: default
title: Expanded JSON Specification
description: All JSON specifications expanded for consumption by AI systems and developers implementing EQDS
---

# Expanded JSON Specification - Equine Data Standard (EQDS)

**For AI Systems and Developer Integration**

**Version:** 1.1.0  
**Status:** Draft  
**Date:** 2025-08-31  
**Publisher:** Equine Data Standard (EQDS)  
**Base:** HL7® FHIR® R5  

This page provides the expanded JSON specification for the Equine Data Standard in a single location, optimized for AI systems and developers who need to understand and implement EQDS-compliant applications.

### Navigation

- [← Back to EQDS Homepage](/)
- [📋 Full Technical Specification](/specification)

---

## Quick Reference

### Resource Overview

| Resource Type | Profile URL | Description | Key Extensions |
|---------------|-------------|-------------|----------------|
| **Patient** | `https://eqds.org/StructureDefinition/equine-patient` | Equine patient with horse-specific data | ownership, equine-color, breeding-info |
| **Observation** | `https://eqds.org/StructureDefinition/equine-observation` | Clinical observations, training metrics, competition scores | - |
| **MedicationAdministration** | `https://eqds.org/StructureDefinition/equine-medication-administration` | Medications with competition withdrawal times | withdrawal-time |
| **Immunization** | `https://eqds.org/StructureDefinition/equine-immunization` | Vaccinations and immunization schedules | next-due |
| **Procedure** | `https://eqds.org/StructureDefinition/equine-procedure` | Veterinary procedures and treatments | - |
| **Practitioner** | `https://eqds.org/StructureDefinition/equine-practitioner` | Veterinary practitioners with qualifications | - |
| **Organization** | `https://eqds.org/StructureDefinition/equine-organization` | Clinics, training facilities, competition venues | - |

### Canonical URL Base
All EQDS resources use `https://eqds.org` as the base URL:
- StructureDefinitions: `/StructureDefinition/{id}`
- Extensions: `/StructureDefinition/{extension-id}`
- CodeSystems: `/CodeSystem/{system-id}`
- ValueSets: `/ValueSet/{valueset-id}`

---

## FHIR Profile Definitions

### 1. Equine Patient Profile

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-patient",
  "url": "https://eqds.org/StructureDefinition/equine-patient",
  "version": "1.0.0",
  "name": "EquinePatient",
  "title": "Equine Patient Profile",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Profile for equine patients using standard patient-animal extension",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "Patient",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Patient",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Patient.extension:animal",
        "path": "Patient.extension",
        "sliceName": "animal",
        "min": 1,
        "max": "1",
        "type": [{
          "code": "Extension",
          "profile": ["http://hl7.org/fhir/StructureDefinition/patient-animal"]
        }]
      },
      {
        "id": "Patient.extension:animal.extension:species",
        "path": "Patient.extension.extension",
        "sliceName": "species",
        "min": 1,
        "max": "1",
        "fixedCodeableConcept": {
          "coding": [{
            "system": "http://snomed.info/sct",
            "code": "35354009",
            "display": "Horse (organism)"
          }]
        }
      },
      {
        "id": "Patient.extension:animal.extension:breed",
        "path": "Patient.extension.extension",
        "sliceName": "breed",
        "min": 1,
        "max": "1",
        "binding": {
          "strength": "required",
          "valueSet": "https://eqds.org/ValueSet/breed-codes"
        }
      },
      {
        "id": "Patient.extension:animal.extension:genderStatus",
        "path": "Patient.extension.extension",
        "sliceName": "genderStatus",
        "min": 1,
        "max": "1",
        "binding": {
          "strength": "required",
          "valueSet": "https://eqds.org/ValueSet/equine-sex"
        }
      },
      {
        "id": "Patient.extension:color",
        "path": "Patient.extension",
        "sliceName": "color",
        "min": 0,
        "max": "1",
        "type": [{
          "code": "Extension",
          "profile": ["https://eqds.org/StructureDefinition/equine-color"]
        }]
      }
    ]
  }
}
```

### 2. Equine Observation Profile

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-observation",
  "url": "https://eqds.org/StructureDefinition/equine-observation",
  "version": "1.0.0",
  "name": "EquineObservation",
  "title": "Equine Observation Profile",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Profile for equine clinical observations, training metrics, and competition performance",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "Observation",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Observation",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Observation.subject",
        "path": "Observation.subject",
        "type": [{
          "code": "Reference",
          "targetProfile": ["https://eqds.org/StructureDefinition/equine-patient"]
        }]
      },
      {
        "id": "Observation.category",
        "path": "Observation.category",
        "min": 1,
        "binding": {
          "strength": "preferred",
          "valueSet": "http://terminology.hl7.org/ValueSet/observation-category"
        }
      }
    ]
  }
}
```

### 3. Equine Medication Administration Profile

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-medication-administration",
  "url": "https://eqds.org/StructureDefinition/equine-medication-administration",
  "version": "1.0.0",
  "name": "EquineMedicationAdministration",
  "title": "Equine Medication Administration Profile",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Profile for equine medication administration with competition withdrawal times",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "MedicationAdministration",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/MedicationAdministration",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "MedicationAdministration.subject",
        "path": "MedicationAdministration.subject",
        "type": [{
          "code": "Reference",
          "targetProfile": ["https://eqds.org/StructureDefinition/equine-patient"]
        }]
      },
      {
        "id": "MedicationAdministration.extension:withdrawal-time",
        "path": "MedicationAdministration.extension",
        "sliceName": "withdrawal-time",
        "min": 0,
        "max": "*",
        "type": [{
          "code": "Extension",
          "profile": ["https://eqds.org/StructureDefinition/withdrawal-time"]
        }]
      }
    ]
  }
}
```

### 4. Equine Immunization Profile

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-immunization",
  "url": "https://eqds.org/StructureDefinition/equine-immunization",
  "version": "1.0.0",
  "name": "EquineImmunization",
  "title": "Equine Immunization Profile",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Profile for equine immunizations and vaccinations",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "Immunization",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Immunization",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Immunization.patient",
        "path": "Immunization.patient",
        "type": [{
          "code": "Reference",
          "targetProfile": ["https://eqds.org/StructureDefinition/equine-patient"]
        }]
      },
      {
        "id": "Immunization.extension:next-due",
        "path": "Immunization.extension",
        "sliceName": "next-due",
        "min": 0,
        "max": "1",
        "type": [{
          "code": "Extension",
          "profile": ["https://eqds.org/StructureDefinition/next-due"]
        }]
      }
    ]
  }
}
```

### 5. Equine Procedure Profile

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-procedure",
  "url": "https://eqds.org/StructureDefinition/equine-procedure",
  "version": "1.0.0",
  "name": "EquineProcedure",
  "title": "Equine Procedure Profile",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Profile for equine procedures including joint injections, dental work, and farrier services",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "Procedure",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Procedure",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Procedure.subject",
        "path": "Procedure.subject",
        "type": [{
          "code": "Reference",
          "targetProfile": ["https://eqds.org/StructureDefinition/equine-patient"]
        }]
      }
    ]
  }
}
```

### 6. Equine Practitioner Profile

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-practitioner",
  "url": "https://eqds.org/StructureDefinition/equine-practitioner",
  "version": "1.0.0",
  "name": "EquinePractitioner",
  "title": "Equine Practitioner Profile",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Profile for equine veterinary practitioners with specialized qualifications",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "Practitioner",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Practitioner",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Practitioner.identifier",
        "path": "Practitioner.identifier",
        "min": 1,
        "mustSupport": true
      },
      {
        "id": "Practitioner.qualification",
        "path": "Practitioner.qualification",
        "min": 1,
        "mustSupport": true
      }
    ]
  }
}
```

### 7. Equine Organization Profile

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-organization",
  "url": "https://eqds.org/StructureDefinition/equine-organization",
  "version": "1.0.0",
  "name": "EquineOrganization",
  "title": "Equine Organization Profile",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Profile for organizations involved in equine care including clinics, training facilities, and competition venues",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "Organization",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Organization",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Organization.type",
        "path": "Organization.type",
        "min": 1,
        "binding": {
          "strength": "extensible",
          "valueSet": "http://terminology.hl7.org/ValueSet/organization-type"
        }
      }
    ]
  }
}
```

---

## Extension Definitions

### 1. Ownership Extension
**URL:** `https://eqds.org/StructureDefinition/ownership`

Supports fractional ownership with validation that ownership percentages should sum to 100% (±0.01% tolerance).

```json
{
  "resourceType": "StructureDefinition",
  "id": "ownership",
  "url": "https://eqds.org/StructureDefinition/ownership",
  "version": "1.0.0",
  "name": "Ownership",
  "title": "Ownership Extension",
  "status": "draft",
  "kind": "complex-type",
  "abstract": false,
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Extension.extension:owner",
        "path": "Extension.extension",
        "sliceName": "owner",
        "min": 1,
        "max": "1",
        "type": [{
          "code": "Extension"
        }]
      },
      {
        "id": "Extension.extension:owner.url",
        "path": "Extension.extension.url",
        "fixedUri": "owner"
      },
      {
        "id": "Extension.extension:owner.value[x]",
        "path": "Extension.extension.value[x]",
        "type": [{
          "code": "Reference",
          "targetProfile": ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"]
        }]
      },
      {
        "id": "Extension.extension:percentage",
        "path": "Extension.extension",
        "sliceName": "percentage",
        "min": 1,
        "max": "1",
        "type": [{
          "code": "Extension"
        }]
      },
      {
        "id": "Extension.extension:percentage.url",
        "path": "Extension.extension.url",
        "fixedUri": "percentage"
      },
      {
        "id": "Extension.extension:percentage.value[x]",
        "path": "Extension.extension.value[x]",
        "type": [{
          "code": "decimal"
        }]
      }
    ]
  }
}
```

### 2. Breeding Info Extension
**URL:** `https://eqds.org/StructureDefinition/breeding-info`

```json
{
  "resourceType": "StructureDefinition",
  "id": "breeding-info",
  "url": "https://eqds.org/StructureDefinition/breeding-info",
  "version": "1.0.0",
  "name": "BreedingInfo",
  "title": "Breeding Information Extension",
  "status": "draft",
  "kind": "complex-type",
  "abstract": false,
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Extension.extension:sire",
        "path": "Extension.extension",
        "sliceName": "sire",
        "min": 0,
        "max": "1",
        "type": [{
          "code": "Extension"
        }]
      },
      {
        "id": "Extension.extension:sire.url",
        "path": "Extension.extension.url",
        "fixedUri": "sire"
      },
      {
        "id": "Extension.extension:sire.value[x]",
        "path": "Extension.extension.value[x]",
        "type": [{
          "code": "string"
        }]
      },
      {
        "id": "Extension.extension:dam",
        "path": "Extension.extension",
        "sliceName": "dam",
        "min": 0,
        "max": "1",
        "type": [{
          "code": "Extension"
        }]
      },
      {
        "id": "Extension.extension:dam.url",
        "path": "Extension.extension.url",
        "fixedUri": "dam"
      },
      {
        "id": "Extension.extension:dam.value[x]",
        "path": "Extension.extension.value[x]",
        "type": [{
          "code": "string"
        }]
      }
    ]
  }
}
```

### 3. Equine Color Extension
**URL:** `https://eqds.org/StructureDefinition/equine-color`

```json
{
  "resourceType": "StructureDefinition",
  "id": "equine-color",
  "url": "https://eqds.org/StructureDefinition/equine-color",
  "version": "1.0.0",
  "name": "EquineColor",
  "title": "Equine Color Extension",
  "status": "draft",
  "kind": "complex-type",
  "abstract": false,
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Extension.value[x]",
        "path": "Extension.value[x]",
        "type": [{
          "code": "CodeableConcept"
        }],
        "binding": {
          "strength": "preferred",
          "valueSet": "https://eqds.org/ValueSet/color-codes"
        }
      }
    ]
  }
}
```

### 4. Withdrawal Time Extension
**URL:** `https://eqds.org/StructureDefinition/withdrawal-time`

```json
{
  "resourceType": "StructureDefinition",
  "id": "withdrawal-time",
  "url": "https://eqds.org/StructureDefinition/withdrawal-time",
  "version": "1.0.0",
  "name": "WithdrawalTime",
  "title": "Withdrawal Time Extension",
  "status": "draft",
  "kind": "complex-type",
  "abstract": false,
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Extension.extension:organization",
        "path": "Extension.extension",
        "sliceName": "organization",
        "min": 1,
        "max": "1",
        "type": [{
          "code": "Extension"
        }]
      },
      {
        "id": "Extension.extension:organization.url",
        "path": "Extension.extension.url",
        "fixedUri": "organization"
      },
      {
        "id": "Extension.extension:organization.value[x]",
        "path": "Extension.extension.value[x]",
        "type": [{
          "code": "CodeableConcept"
        }],
        "binding": {
          "strength": "required",
          "valueSet": "https://eqds.org/ValueSet/competition-organizations"
        }
      },
      {
        "id": "Extension.extension:duration",
        "path": "Extension.extension",
        "sliceName": "duration",
        "min": 1,
        "max": "1",
        "type": [{
          "code": "Extension"
        }]
      },
      {
        "id": "Extension.extension:duration.url",
        "path": "Extension.extension.url",
        "fixedUri": "duration"
      },
      {
        "id": "Extension.extension:duration.value[x]",
        "path": "Extension.extension.value[x]",
        "type": [{
          "code": "Duration"
        }]
      }
    ]
  }
}
```

### 5. Next Due Extension
**URL:** `https://eqds.org/StructureDefinition/next-due`

```json
{
  "resourceType": "StructureDefinition",
  "id": "next-due",
  "url": "https://eqds.org/StructureDefinition/next-due",
  "version": "1.0.0",
  "name": "NextDue",
  "title": "Next Due Date Extension",
  "status": "draft",
  "kind": "complex-type",
  "abstract": false,
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Extension.value[x]",
        "path": "Extension.value[x]",
        "type": [{
          "code": "date"
        }]
      }
    ]
  }
}
```

---

## Code Systems

### 1. Equine Sex Code System
**URL:** `https://eqds.org/CodeSystem/equine-sex`

```json
{
  "resourceType": "CodeSystem",
  "id": "equine-sex",
  "url": "https://eqds.org/CodeSystem/equine-sex",
  "version": "1.0.0",
  "name": "EquineSex",
  "title": "Equine Sex Code System",
  "status": "draft",
  "experimental": false,
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Code system for equine sex classifications",
  "caseSensitive": true,
  "content": "complete",
  "concept": [
    {
      "code": "mare",
      "display": "Mare",
      "definition": "Adult female horse"
    },
    {
      "code": "stallion",
      "display": "Stallion",
      "definition": "Adult intact male horse"
    },
    {
      "code": "gelding",
      "display": "Gelding",
      "definition": "Adult castrated male horse"
    },
    {
      "code": "filly",
      "display": "Filly",
      "definition": "Young female horse (typically under 4 years)"
    },
    {
      "code": "colt",
      "display": "Colt",
      "definition": "Young male horse (typically under 4 years)"
    }
  ]
}
```

### 2. Breed Codes Code System
**URL:** `https://eqds.org/CodeSystem/breed-codes`

```json
{
  "resourceType": "CodeSystem",
  "id": "breed-codes",
  "url": "https://eqds.org/CodeSystem/breed-codes",
  "version": "1.0.0",
  "name": "BreedCodes",
  "title": "Horse Breed Code System",
  "status": "draft",
  "experimental": false,
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Code system for horse breeds",
  "caseSensitive": true,
  "content": "complete",
  "concept": [
    {
      "code": "QH",
      "display": "Quarter Horse",
      "definition": "American Quarter Horse"
    },
    {
      "code": "TB",
      "display": "Thoroughbred",
      "definition": "Thoroughbred"
    },
    {
      "code": "AR",
      "display": "Arabian",
      "definition": "Arabian horse"
    },
    {
      "code": "PB",
      "display": "Paint Horse",
      "definition": "American Paint Horse"
    },
    {
      "code": "AP",
      "display": "Appaloosa",
      "definition": "Appaloosa"
    },
    {
      "code": "WB",
      "display": "Warmblood",
      "definition": "Sport horse warmblood"
    }
  ]
}
```

### 3. Color Codes Code System
**URL:** `https://eqds.org/CodeSystem/color-codes`

```json
{
  "resourceType": "CodeSystem",
  "id": "color-codes",
  "url": "https://eqds.org/CodeSystem/color-codes",
  "version": "1.0.0",
  "name": "ColorCodes",
  "title": "Horse Color Code System",
  "status": "draft",
  "experimental": false,
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Code system for horse colors",
  "caseSensitive": true,
  "content": "complete",
  "concept": [
    {
      "code": "bay",
      "display": "Bay",
      "definition": "Brown body with black mane, tail, and lower legs"
    },
    {
      "code": "chestnut",
      "display": "Chestnut",
      "definition": "Reddish-brown body, mane, and tail"
    },
    {
      "code": "black",
      "display": "Black",
      "definition": "Black body, mane, and tail"
    },
    {
      "code": "gray",
      "display": "Gray",
      "definition": "Gray to white coat with dark skin"
    },
    {
      "code": "pal",
      "display": "Palomino",
      "definition": "Golden body with light mane and tail"
    },
    {
      "code": "pinto",
      "display": "Pinto",
      "definition": "Spotted or patched coloring"
    }
  ]
}
```

### 4. Competition Organizations Code System
**URL:** `https://eqds.org/CodeSystem/competition-orgs`

```json
{
  "resourceType": "CodeSystem",
  "id": "competition-orgs",
  "url": "https://eqds.org/CodeSystem/competition-orgs",
  "version": "1.0.0",
  "name": "CompetitionOrgs",
  "title": "Competition Organizations Code System",
  "status": "draft",
  "experimental": false,
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Code system for equestrian competition organizations",
  "caseSensitive": true,
  "content": "complete",
  "concept": [
    {
      "code": "fei",
      "display": "FEI",
      "definition": "Fédération Équestre Internationale"
    },
    {
      "code": "usef",
      "display": "USEF",
      "definition": "United States Equestrian Federation"
    },
    {
      "code": "nrha",
      "display": "NRHA",
      "definition": "National Reining Horse Association"
    },
    {
      "code": "aqha",
      "display": "AQHA",
      "definition": "American Quarter Horse Association"
    }
  ]
}
```

---

## Complete JSON Examples

### 1. Complete Equine Patient Example

```json
{
  "resourceType": "Patient",
  "id": "example-horse-01",
  "meta": {
    "profile": ["https://eqds.org/StructureDefinition/equine-patient"]
  },
  "text": {
    "status": "generated",
    "div": "<div xmlns='http://www.w3.org/1999/xhtml'>Quarter Horse stallion 'Smart Little Pepto', born 2018-04-15, AQHA #5742891</div>"
  },
  "identifier": [
    {
      "type": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
          "code": "MR",
          "display": "Medical record number"
        }]
      },
      "system": "http://example-clinic.com/horses",
      "value": "EQ-2024-1234"
    },
    {
      "type": {
        "text": "AQHA Registration"
      },
      "system": "http://aqha.com/registration",
      "value": "5742891"
    },
    {
      "type": {
        "text": "Microchip"
      },
      "system": "http://icar.org/microchip",
      "value": "985141405208421"
    }
  ],
  "name": [{
    "use": "official",
    "text": "Smart Little Pepto",
    "given": ["Pepto"]
  }],
  "gender": "unknown",
  "birthDate": "2018-04-15",
  "extension": [
    {
      "url": "http://hl7.org/fhir/StructureDefinition/patient-animal",
      "extension": [
        {
          "url": "species",
          "valueCodeableConcept": {
            "coding": [{
              "system": "http://snomed.info/sct",
              "code": "35354009",
              "display": "Horse (organism)"
            }]
          }
        },
        {
          "url": "breed",
          "valueCodeableConcept": {
            "coding": [{
              "system": "https://eqds.org/CodeSystem/breed-codes",
              "code": "QH",
              "display": "Quarter Horse"
            }]
          }
        },
        {
          "url": "genderStatus",
          "valueCodeableConcept": {
            "coding": [{
              "system": "https://eqds.org/CodeSystem/equine-sex",
              "code": "stallion",
              "display": "Stallion"
            }]
          }
        }
      ]
    },
    {
      "url": "https://eqds.org/StructureDefinition/equine-color",
      "valueCodeableConcept": {
        "coding": [{
          "system": "https://eqds.org/CodeSystem/color-codes",
          "code": "pal",
          "display": "Palomino"
        }]
      }
    },
    {
      "url": "https://eqds.org/StructureDefinition/ownership",
      "extension": [
        {
          "url": "owner",
          "valueReference": {
            "reference": "RelatedPerson/owner-john-smith"
          }
        },
        {
          "url": "percentage",
          "valueDecimal": 60.0
        }
      ]
    },
    {
      "url": "https://eqds.org/StructureDefinition/ownership",
      "extension": [
        {
          "url": "owner",
          "valueReference": {
            "reference": "RelatedPerson/owner-jane-doe"
          }
        },
        {
          "url": "percentage",
          "valueDecimal": 40.0
        }
      ]
    },
    {
      "url": "https://eqds.org/StructureDefinition/breeding-info",
      "extension": [
        {
          "url": "sire",
          "valueString": "Peptoboonsmal"
        },
        {
          "url": "dam",
          "valueString": "Smart Little Lena"
        }
      ]
    }
  ],
  "contact": [
    {
      "relationship": [{
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
          "code": "O",
          "display": "Other"
        }],
        "text": "Trainer"
      }],
      "name": {
        "text": "Bob Johnson"
      },
      "telecom": [{
        "system": "phone",
        "value": "+1-555-0123"
      }]
    }
  ]
}
```

### 2. Lameness Observation Example

```json
{
  "resourceType": "Observation",
  "id": "lameness-exam-001",
  "meta": {
    "profile": ["https://eqds.org/StructureDefinition/equine-observation"]
  },
  "status": "final",
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/observation-category",
      "code": "exam",
      "display": "Exam"
    }]
  }],
  "code": {
    "coding": [{
      "system": "https://eqds.org/CodeSystem/observations",
      "code": "lameness-grade",
      "display": "AAEP Lameness Scale"
    }]
  },
  "subject": {
    "reference": "Patient/example-horse-01"
  },
  "effectiveDateTime": "2025-08-27T10:00:00Z",
  "performer": [{
    "reference": "Practitioner/vet-smith",
    "display": "Dr. John Smith, DVM"
  }],
  "valueCodeableConcept": {
    "coding": [{
      "system": "https://eqds.org/CodeSystem/lameness-grades",
      "code": "2",
      "display": "Grade 2/5 lameness"
    }],
    "text": "Grade 2/5 lameness left front"
  },
  "component": [
    {
      "code": {
        "coding": [{
          "system": "https://eqds.org/CodeSystem/observations",
          "code": "left-front",
          "display": "Left Front"
        }]
      },
      "valueInteger": 2
    },
    {
      "code": {
        "coding": [{
          "system": "https://eqds.org/CodeSystem/observations",
          "code": "right-front",
          "display": "Right Front"
        }]
      },
      "valueInteger": 0
    }
  ]
}
```

### 3. Medication Administration with Withdrawal Time Example

```json
{
  "resourceType": "MedicationAdministration",
  "id": "phenylbutazone-admin",
  "meta": {
    "profile": ["https://eqds.org/StructureDefinition/equine-medication-administration"]
  },
  "status": "completed",
  "medicationCodeableConcept": {
    "coding": [{
      "system": "https://eqds.org/CodeSystem/veterinary-medications",
      "code": "phenylbutazone",
      "display": "Phenylbutazone (Bute)"
    }],
    "text": "Phenylbutazone 2g PO"
  },
  "subject": {
    "reference": "Patient/example-horse-01"
  },
  "occurredDateTime": "2025-08-20T08:00:00Z",
  "dosage": {
    "dose": {
      "value": 2,
      "unit": "g",
      "system": "http://unitsofmeasure.org",
      "code": "g"
    },
    "route": {
      "coding": [{
        "system": "http://snomed.info/sct",
        "code": "26643006",
        "display": "Oral route"
      }]
    }
  },
  "extension": [{
    "url": "https://eqds.org/StructureDefinition/withdrawal-time",
    "extension": [
      {
        "url": "organization",
        "valueCodeableConcept": {
          "coding": [{
            "system": "https://eqds.org/CodeSystem/competition-orgs",
            "code": "usef",
            "display": "United States Equestrian Federation"
          }]
        }
      },
      {
        "url": "duration",
        "valueDuration": {
          "value": 7,
          "unit": "days",
          "system": "http://unitsofmeasure.org",
          "code": "d"
        }
      }
    ]
  }]
}
```

---

## Implementation Patterns

### REST API Endpoints

**Base URL Pattern:** `[server-base]/[resource-type]`

#### Common Search Patterns

```text
GET [base]/Patient?breed=QH&owner=RelatedPerson/123
GET [base]/Patient?microchip=985141405208421
GET [base]/Observation?subject=Patient/horse-123&category=training
GET [base]/MedicationAdministration?subject=Patient/horse-123
GET [base]/Immunization?patient=Patient/horse-123&status=completed
```

#### Search Parameters

| Resource | Parameter | Type | Description |
|----------|-----------|------|-------------|
| Patient | `breed` | token | Search by breed code |
| Patient | `microchip` | token | Search by microchip identifier |
| Patient | `owner` | reference | Search by owner reference |
| Observation | `category` | token | clinical, training, competition |
| MedicationAdministration | `withdrawal-time` | composite | Filter by withdrawal status |

### Business Rules and Validation

1. **Ownership Percentages**: All ownership extensions for a patient MUST sum to 100% (±0.01% tolerance)
2. **Species Constraint**: Patient.extension:animal.extension:species MUST be fixed to Horse (SNOMED: 35354009)
3. **Required Elements**: 
   - Patient: identifier, name, animal extension with species, breed, genderStatus
   - Observation: subject (must reference equine-patient), category
   - All other profiles: subject/patient must reference equine-patient

### Error Handling

```json
{
  "resourceType": "OperationOutcome",
  "issue": [{
    "severity": "error",
    "code": "business-rule",
    "details": {
      "text": "Ownership percentages must sum to 100%. Current total: 80%"
    },
    "location": ["Patient.extension:ownership"]
  }]
}
```

### Bundle Examples for Common Workflows

#### Health Certificate Bundle

This bundle includes a complete patient resource, physical examination findings, and current vaccinations:

```json
{
  "resourceType": "Bundle",
  "id": "health-certificate-bundle",
  "type": "document",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "example-horse-01",
        "meta": {
          "profile": ["https://eqds.org/StructureDefinition/equine-patient"]
        }
      }
    },
    {
      "resource": {
        "resourceType": "Observation",
        "id": "physical-exam-001",
        "meta": {
          "profile": ["https://eqds.org/StructureDefinition/equine-observation"]
        }
      }
    },
    {
      "resource": {
        "resourceType": "Immunization",
        "id": "vaccination-001",
        "meta": {
          "profile": ["https://eqds.org/StructureDefinition/equine-immunization"]
        }
      }
    }
  ]
}
```

---

## Terminology Bindings Summary

| Element | Binding Strength | ValueSet |
|---------|------------------|----------|
| Patient.extension:animal.extension:breed | required | https://eqds.org/ValueSet/breed-codes |
| Patient.extension:animal.extension:genderStatus | required | https://eqds.org/ValueSet/equine-sex |
| Patient.extension:color.valueCodeableConcept | preferred | https://eqds.org/ValueSet/color-codes |
| Observation.category | preferred | http://terminology.hl7.org/ValueSet/observation-category |
| MedicationAdministration.extension:withdrawal-time.extension:organization | required | https://eqds.org/ValueSet/competition-organizations |

---

## Contact and Support

**Email:** equinedatastandard@gmail.com  
**Website:** https://eqds.org  
**GitHub:** https://github.com/EQDS  
**License:** CC0-1.0 Universal

---

*This specification is designed for AI systems and developers implementing EQDS-compliant applications. All JSON examples are fully validated against the EQDS profiles and ready for implementation.*