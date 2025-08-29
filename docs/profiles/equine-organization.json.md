---
redirect_from:
  - /StructureDefinition/equine-organization
layout: none
permalink: /profiles/equine-organization.json
---
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