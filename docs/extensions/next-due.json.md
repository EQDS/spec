---
redirect_from:
  - /StructureDefinition/next-due
layout: none
permalink: /docs/extensions/next-due.json
---
{
  "resourceType": "StructureDefinition",
  "id": "next-due",
  "url": "https://eqds.org/StructureDefinition/next-due",
  "version": "1.0.0",
  "name": "NextDueExtension",
  "title": "Next Due Date Extension",
  "status": "draft",
  "date": "2025-08-27",
  "publisher": "Equine Data Standard (EQDS)",
  "description": "Extension for tracking when the next vaccination is due",
  "fhirVersion": "5.0.0",
  "kind": "complex-type",
  "abstract": false,
  "context": [
    {
      "type": "element",
      "expression": "Immunization"
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
        "short": "Next vaccination due date",
        "definition": "Date when the next vaccination is due"
      },
      {
        "id": "Extension.url",
        "path": "Extension.url",
        "fixedUri": "https://eqds.org/StructureDefinition/next-due"
      },
      {
        "id": "Extension.valueDate",
        "path": "Extension.valueDate",
        "min": 1,
        "type": [
          {
            "code": "date"
          }
        ]
      }
    ]
  }
}