---
redirect_from:
  - /ValueSet/equine-sex
layout: none
permalink: /valuesets/equine-sex.json
---
{
  "resourceType": "ValueSet",
  "id": "equine-sex",
  "url": "https://eqds.org/ValueSet/equine-sex",
  "name": "EquineSexValueSet",
  "status": "active",
  "description": "Codes representing equine sex/gender",
  "compose": {
    "include": [{
      "system": "https://eqds.org/CodeSystem/equine-sex",
      "concept": [
        {"code": "mare", "display": "Mare (adult female)"},
        {"code": "stallion", "display": "Stallion (adult intact male)"},
        {"code": "gelding", "display": "Gelding (castrated male)"},
        {"code": "colt", "display": "Colt (young male)"},
        {"code": "filly", "display": "Filly (young female)"}
      ]
    }]
  }
}