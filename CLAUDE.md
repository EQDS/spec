# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository hosts the **EQDS (Equine Data Standard)** specification and documentation website. EQDS is an open specification for interoperability in equine health and management systems, built on top of HL7® FHIR®.

## Repository Structure

- `/docs/` - GitHub Pages website source (published to eqds.org)
  - `index.md` - Homepage content
  - `specification.md` - Main specification documentation
  - `certification.md` - Vendor certification process
  - `vendors.md` - List of certified vendors
  - `profiles/` - FHIR StructureDefinitions (actual JSON files)
  - `extensions/` - FHIR Extensions (actual JSON files)  
  - `codesystems/` - FHIR CodeSystems (actual JSON files)
  - `valuesets/` - FHIR ValueSets (actual JSON files)
  - `samples/` - Example FHIR bundles (actual JSON files)
  - `CNAME` - GitHub Pages custom domain configuration
- `/tools/` - **NEW**: Developer tooling and SDKs
  - `schema-generator/` - Converts FHIR StructureDefinitions to JSON Schemas
  - `eqds-schemas/` - Generated JSON Schemas from FHIR profiles
  - `eqds-typescript/` - TypeScript SDK with types and validation
  - `eqds-python/` - Python SDK (planned)
  - `eqds-cli/` - CLI validator (planned)
  - `eqds-playground/` - Web playground (planned)

## Architecture

This repository serves dual purposes:
1. **Documentation and Specification**: FHIR-based profiles, value sets, exchange rules, and certification process
2. **Developer Tooling**: TypeScript SDK, JSON Schemas, validation tools, and examples

**Core Components:**
1. **FHIR-based profiles** for horse identification, veterinary records, lab results, and competition data
2. **Value sets** for standardized terminology (actual JSON files in `/docs/codesystems/`)
3. **Exchange rules** for interoperable data transmission
4. **Developer tools** for easy EQDS adoption (TypeScript SDK, JSON Schemas, validators)
5. **Certification process** for vendor compliance

The specification defines transmission formats only - internal application schemas may vary. The developer tools help implementers easily create EQDS-compliant resources.

## Website Deployment

The `/docs` directory serves as a GitHub Pages site deployed to eqds.org. Content is written in Markdown and automatically published when changes are pushed to the main branch.

### Theme and Styling

The website uses the **Tactile theme** (`pages-themes/tactile@v0.2.0`) configured in `docs/_config.yml`. Key styling details:

- **Custom CSS**: Located in `docs/assets/css/style.scss`
- **Brand Colors**: EQDS color palette defined in CSS variables:
  - `--eqds-primary: #2c3e50` (dark blue)
  - `--eqds-secondary: #3498db` (light blue) 
  - `--eqds-accent: #e74c3c` (red)
  - `--eqds-light: #ecf0f1` (light gray)
  - `--eqds-dark: #34495e` (darker blue)
- **Layout**: Uses flexbox for responsive design with custom `.resource-cards` grid system
- **Logo**: EQDS official badge located at `docs/assets/css/eqds-official-badge.png`
- **Typography**: Enhanced contrast and readability with custom font weights
- **Components**: Custom styled cards, tables, alerts, and navigation elements

The theme provides the basic structure while extensive custom CSS overrides create the professional EQDS branding and layout.

## Contributing Guidelines

From README.md: "Pull requests are welcome. Please ensure all examples validate against the EQDS profiles."

**Developer Tooling**: The `/tools` directory contains developer tooling that is automatically generated from the FHIR profiles in `/docs`. The TypeScript SDK and JSON Schemas are generated from the actual StructureDefinitions, so changes to profiles will automatically be reflected in the tooling.

**Validation**: The TypeScript SDK (`/tools/eqds-typescript`) provides comprehensive validation including:
- FHIR structure validation
- EQDS business rules (e.g., ownership percentages must sum to 100%)
- Species validation (must be Horse)
- Extension and terminology validation