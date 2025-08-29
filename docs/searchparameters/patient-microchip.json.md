---
redirect_from:
  - /SearchParameter/equine-patient-microchip
layout: none
permalink: /docs/searchparameters/patient-microchip.json
---
{
  "resourceType": "SearchParameter",
  "id": "equine-patient-microchip",
  "url": "https://eqds.org/SearchParameter/equine-patient-microchip",
  "name": "microchip",
  "status": "active",
  "description": "Search by microchip identifier",
  "code": "microchip",
  "base": ["Patient"],
  "type": "token",
  "expression": "Patient.identifier.where(system='http://icar.org/microchip')"
}