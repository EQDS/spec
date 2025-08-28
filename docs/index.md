---
layout: default
title: Equine Data Standard (EQDS)
description: Open FHIR specification for equine health data interoperability
---

# EQDS — Equine Data Standard

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

### 🏥 Profiles - Core Resources

- [Equine Patient](profiles/equine-patient.json) - Core equine patient profile
- [Equine Observation](profiles/equine-observation.json) - Clinical observations, training, and competition data
- [Equine Medication Administration](profiles/equine-medication-administration.json) - Medications with withdrawal times
- [Equine Immunization](profiles/equine-immunization.json) - Vaccinations and immunizations
- [Equine Procedure](profiles/equine-procedure.json) - Veterinary procedures
- [Equine Practitioner](profiles/equine-practitioner.json) - Veterinary practitioners
- [Equine Organization](profiles/equine-organization.json) - Clinics, facilities, and venues

### 📚 Code Systems - Terminologies

- [Equine Sex](codesystems/equine-sex.json) - Mare, stallion, gelding, etc.
- [Breed Codes](codesystems/breed-codes.json) - Horse breed classifications
- [Color Codes](codesystems/color-codes.json) - Coat colors and markings
- [Discipline Codes](codesystems/discipline-codes.json) - Equestrian disciplines
- [Competition Organizations](codesystems/competition-orgs.json) - FEI, USEF, etc.
- [Veterinary Medications](codesystems/veterinary-medications.json) - Common equine medications

### 🔧 Extensions - Equine-Specific Data

- [Ownership Extension](extensions/ownership.json) - Track fractional ownership
- [Breeding Info Extension](extensions/breeding-info.json) - Sire and dam information
- [Equine Color Extension](extensions/equine-color.json) - Color and markings
- [Withdrawal Time Extension](extensions/withdrawal-time.json) - Competition drug withdrawal
- [Next Due Extension](extensions/next-due.json) - Vaccination schedules

### 📝 Examples - Implementation Samples

- [Patient Example](samples/patient-example.json) - Complete equine patient record
- [Lameness Observation](samples/observation-lameness.json) - AAEP lameness grading
- [Competition Score](samples/observation-competition.json) - Reining pattern score
- [Training Session](samples/observation-training.json) - Training activity record
- [Height Measurement](samples/observation-height.json) - Body height measurement
- [Vaccination Record](samples/immunization-example.json) - Immunization example
- [Coggins Test](samples/coggins-test.json) - EIA test result
- [Medication Administration](samples/medication-administration.json) - Drug administration with withdrawal

### 📊 Value Sets

- [Equine Sex ValueSet](valuesets/equine-sex.json)
- [Breed Codes ValueSet](valuesets/breed-codes.json)
- [Competition Organizations ValueSet](valuesets/competition-organizations.json)

### 🔍 Search Parameters

- [Patient Breed Search](searchparameters/patient-breed.json)
- [Patient Microchip Search](searchparameters/patient-microchip.json)
- [Patient Owner Search](searchparameters/patient-owner.json)