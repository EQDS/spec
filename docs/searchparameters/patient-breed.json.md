---
redirect_from:
  - /SearchParameter/equine-patient-breed
layout: none
permalink: /searchparameters/patient-breed.json
---
{
  "resourceType": "SearchParameter",
  "id": "equine-patient-breed",
  "url": "https://eqds.org/SearchParameter/equine-patient-breed",
  "name": "breed",
  "status": "active",
  "description": "Search by horse breed",
  "code": "breed",
  "base": ["Patient"],
  "type": "token",
  "expression": "Patient.extension.where(url='http://hl7.org/fhir/StructureDefinition/patient-animal').extension.where(url='breed').value"
}