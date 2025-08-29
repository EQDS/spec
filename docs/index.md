---
layout: default
title: Equine Data Standard (EQDS)
description: Open FHIR specification for equine health data interoperability
---

# Equine Data Standard (EQDS)

Welcome to **EQDS**, the open standard for equine health interoperability.

## About
EQDS defines FHIR-based profiles, value sets, and exchange rules for:
- Horse identification
- Veterinary records
- Lab results
- Competition/encounter data

Our goal: **consistent, interoperable data exchange across the equine industry.**

## Quick Links
- [Full Specification](specification.md)
- [Certification Process](certification.md)
- [Certified Vendors](vendors.md)

## FHIR Resources

<div class="resource-cards">
  <div class="card">
    <h3>Profiles - Core Resources</h3>
    <ul>
      <li><a href="profiles/equine-patient.json">Equine Patient</a> - Core equine patient profile</li>
      <li><a href="profiles/equine-observation.json">Equine Observation</a> - Clinical observations, training, and competition data</li>
      <li><a href="profiles/equine-medication-administration.json">Equine Medication Administration</a> - Medications with withdrawal times</li>
      <li><a href="profiles/equine-immunization.json">Equine Immunization</a> - Vaccinations and immunizations</li>
      <li><a href="profiles/equine-procedure.json">Equine Procedure</a> - Veterinary procedures</li>
      <li><a href="profiles/equine-practitioner.json">Equine Practitioner</a> - Veterinary practitioners</li>
      <li><a href="profiles/equine-organization.json">Equine Organization</a> - Clinics, facilities, and venues</li>
    </ul>
  </div>

  <div class="card">
    <h3>Code Systems - Terminologies</h3>
    <ul>
      <li><a href="codesystems/equine-sex.json">Equine Sex</a> - Mare, stallion, gelding, etc.</li>
      <li><a href="codesystems/breed-codes.json">Breed Codes</a> - Horse breed classifications</li>
      <li><a href="codesystems/color-codes.json">Color Codes</a> - Coat colors and markings</li>
      <li><a href="codesystems/discipline-codes.json">Discipline Codes</a> - Equestrian disciplines</li>
      <li><a href="codesystems/competition-orgs.json">Competition Organizations</a> - FEI, USEF, etc.</li>
      <li><a href="codesystems/veterinary-medications.json">Veterinary Medications</a> - Common equine medications</li>
    </ul>
  </div>

  <div class="card">
    <h3>Extensions - Equine-Specific Data</h3>
    <ul>
      <li><a href="extensions/ownership.json">Ownership Extension</a> - Track fractional ownership</li>
      <li><a href="extensions/breeding-info.json">Breeding Info Extension</a> - Sire and dam information</li>
      <li><a href="extensions/equine-color.json">Equine Color Extension</a> - Color and markings</li>
      <li><a href="extensions/withdrawal-time.json">Withdrawal Time Extension</a> - Competition drug withdrawal</li>
      <li><a href="extensions/next-due.json">Next Due Extension</a> - Vaccination schedules</li>
    </ul>
  </div>

  <div class="card">
    <h3>Examples - Implementation Samples</h3>
    <ul>
      <li><a href="samples/patient-example.json">Patient Example</a> - Complete equine patient record</li>
      <li><a href="samples/observation-lameness.json">Lameness Observation</a> - AAEP lameness grading</li>
      <li><a href="samples/observation-competition.json">Competition Score</a> - Reining pattern score</li>
      <li><a href="samples/observation-training.json">Training Session</a> - Training activity record</li>
      <li><a href="samples/observation-height.json">Height Measurement</a> - Body height measurement</li>
      <li><a href="samples/immunization-example.json">Vaccination Record</a> - Immunization example</li>
      <li><a href="samples/coggins-test.json">Coggins Test</a> - EIA test result</li>
      <li><a href="samples/medication-administration.json">Medication Administration</a> - Drug administration with withdrawal</li>
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

  <div class="card">
    <h3>Search Parameters</h3>
    <ul>
      <li><a href="searchparameters/patient-breed.json">Patient Breed Search</a></li>
      <li><a href="searchparameters/patient-microchip.json">Patient Microchip Search</a></li>
      <li><a href="searchparameters/patient-owner.json">Patient Owner Search</a></li>
    </ul>
  </div>
</div>