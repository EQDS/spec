---
redirect_from:
  - /StructureDefinition/ownership
layout: none
permalink: /extensions/ownership.json
---
{
  "resourceType": "StructureDefinition",
  "id": "ownership",
  "url": "https://eqds.org/StructureDefinition/ownership",
  "version": "1.0.0",
  "name": "OwnershipExtension",
  "title": "Ownership Extension",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Extension for tracking equine ownership including fractional ownership",
  "fhirVersion": "5.0.0",
  "kind": "complex-type",
  "abstract": false,
  "context": [
    {
      "type": "element",
      "expression": "Patient"
    }
  ],
  "type": "Extension",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Extension",
        "path": "Extension",
        "short": "Ownership information",
        "definition": "Information about horse ownership including percentage and time periods"
      },
      {
        "id": "Extension.extension:owner",
        "path": "Extension.extension",
        "sliceName": "owner",
        "min": 1,
        "max": "1"
      },
      {
        "id": "Extension.extension:owner.url",
        "path": "Extension.extension.url",
        "fixedUri": "owner"
      },
      {
        "id": "Extension.extension:owner.valueReference",
        "path": "Extension.extension.valueReference",
        "min": 1,
        "type": [
          {
            "code": "Reference",
            "targetProfile": [
              "http://hl7.org/fhir/StructureDefinition/RelatedPerson",
              "http://hl7.org/fhir/StructureDefinition/Organization"
            ]
          }
        ]
      },
      {
        "id": "Extension.extension:percentage",
        "path": "Extension.extension",
        "sliceName": "percentage",
        "min": 0,
        "max": "1"
      },
      {
        "id": "Extension.extension:percentage.url",
        "path": "Extension.extension.url",
        "fixedUri": "percentage"
      },
      {
        "id": "Extension.extension:percentage.valueDecimal",
        "path": "Extension.extension.valueDecimal",
        "min": 1,
        "type": [
          {
            "code": "decimal"
          }
        ]
      },
      {
        "id": "Extension.url",
        "path": "Extension.url",
        "fixedUri": "https://eqds.org/StructureDefinition/ownership"
      },
      {
        "id": "Extension.value[x]",
        "path": "Extension.value[x]",
        "max": "0"
      }
    ]
  }
}