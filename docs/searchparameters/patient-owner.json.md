---
redirect_from:
  - /SearchParameter/equine-patient-owner
layout: none
permalink: /searchparameters/patient-owner.json
---
{
  "resourceType": "SearchParameter",
  "id": "equine-patient-owner",
  "url": "https://eqds.org/SearchParameter/equine-patient-owner",
  "name": "owner",
  "status": "active",
  "description": "Search by owner reference",
  "code": "owner",
  "base": ["Patient"],
  "type": "reference",
  "expression": "Patient.extension.where(url='https://eqds.org/StructureDefinition/ownership').extension.where(url='owner').value",
  "target": ["RelatedPerson", "Organization"]
}