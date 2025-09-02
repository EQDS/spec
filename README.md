# Equine Data Standard (EQDS)

EQDS is an open specification for interoperability in equine health and management systems.  
This repository hosts the official specification and website for [eqds.org](https://eqds.org).

## 🌐 Live Site

Visit **[eqds.org](https://eqds.org)** for the complete specification, examples, and downloadable FHIR resources.

## Repository Structure

```
/docs                           GitHub Pages website source
├── index.md                    Homepage with resource links
├── specification.md            Full FHIR Implementation Guide
├── certification.md            Vendor certification process
├── vendors.md                  List of certified vendors
├── profiles/                   FHIR StructureDefinitions
│   ├── equine-patient.json
│   ├── equine-observation.json
│   ├── equine-medication-administration.json
│   └── ...
├── samples/                    Example FHIR resources
│   ├── patient-example.json
│   ├── observation-lameness.json
│   └── ...
├── codesystems/                FHIR CodeSystems
│   ├── equine-sex.json
│   ├── breed-codes.json
│   └── ...
├── valuesets/                  FHIR ValueSets
├── extensions/                 FHIR Extensions
└── searchparameters/           FHIR SearchParameters

/tools                          Developer tooling (NEW!)
├── schema-generator/           Converts FHIR profiles to JSON Schemas
├── eqds-schemas/               Generated JSON Schemas
├── eqds-typescript/            TypeScript SDK
├── eqds-python/                Python SDK (coming soon)
├── eqds-cli/                   CLI validator (coming soon)
└── eqds-playground/            Web playground (coming soon)
```

## What is EQDS?

EQDS defines FHIR R5-based profiles, value sets, and exchange rules for:
- **Horse identification** - Registration numbers, microchips, breed information
- **Veterinary records** - Clinical observations, procedures, medications
- **Competition data** - Performance scores, fitness evaluations
- **Training metrics** - Session documentation, conditioning data
- **Regulatory compliance** - Coggins testing, health certificates

## Quick Start

### For Implementers
1. Review the [full specification](https://eqds.org/specification)
2. **NEW:** Use our [TypeScript SDK](#typescript-sdk) for rapid development
3. Download relevant [profiles](https://eqds.org/profiles/) for your use case
4. Use [example resources](https://eqds.org/samples/) as implementation guides
5. Validate against FHIR R5 and EQDS profiles

### For Vendors
1. Implement EQDS profiles in your system using our developer tools
2. Validate your implementation with provided examples and SDK
3. Apply for [certification](https://eqds.org/certification)
4. Get listed as a [certified vendor](https://eqds.org/vendors)

## Key Features

- **Standards-based**: Built on HL7 FHIR R5
- **Comprehensive**: Covers clinical care, competition, training, and breeding
- **Flexible ownership**: Supports fractional and complex ownership structures  
- **Competition-ready**: Includes drug withdrawal times and fitness evaluations
- **Extensible**: Designed for future enhancement and specialization

## Developer Tooling 🛠️

### TypeScript SDK

The TypeScript SDK provides type-safe EQDS resource creation and validation:

```typescript
import { createEqdsPatient, assertEqdsPatient } from '@eqds/typescript';

// Create a valid EQDS patient
const patient = createEqdsPatient({
  id: 'horse-123',
  name: 'Thunder Strike',
  genderStatus: 'mare',
  breed: 'QH', // Quarter Horse
  color: 'bay',
  owners: [
    { reference: 'RelatedPerson/owner-1', percentage: 60 },
    { reference: 'RelatedPerson/owner-2', percentage: 40 }
  ]
});

// Validate the patient
assertEqdsPatient(patient); // Throws if invalid
```

**Features:**
- ✅ **Type Safety**: Full TypeScript types generated from FHIR profiles
- ✅ **Business Rules**: Automatic validation (ownership must sum to 100%, species = Horse)
- ✅ **Code Systems**: Constants for breeds, colors, and equine sex from actual EQDS CodeSystems
- ✅ **Factory Functions**: Easy creation with sensible defaults and validation
- ✅ **Utility Functions**: Extract ownership info, animal data, breeding info

### JSON Schemas

Generated directly from the official FHIR StructureDefinitions:

```bash
# Build the schemas from FHIR profiles
cd tools/schema-generator
npm run generate

# Use the schemas (in tools/eqds-schemas/schemas/)
```

### Getting Started with Developer Tools

```bash
# Install dependencies (requires pnpm)
pnpm install

# Generate schemas from FHIR profiles  
pnpm run generate:schemas

# Build TypeScript SDK
cd tools/eqds-typescript
npm run build

# Run tests
npm test
```

## FHIR Resources

All FHIR resources use canonical URLs with the `https://eqds.org` base:
- Profiles: `https://eqds.org/StructureDefinition/equine-patient`
- CodeSystems: `https://eqds.org/CodeSystem/equine-sex`
- ValueSets: `https://eqds.org/ValueSet/breed-codes`
- Extensions: `https://eqds.org/StructureDefinition/ownership`

## Development

This site is built with GitHub Pages using Jekyll. The `/docs` folder contains all source content.

To contribute:
1. Fork this repository
2. Make changes to files in the `/docs` directory
3. Test your changes locally if possible
4. Submit a pull request with a clear description

## Contributing

Pull requests are welcome! Please ensure:
- All examples validate against FHIR R5 and EQDS profiles
- JSON is properly formatted and syntactically valid
- URLs use the correct `https://eqds.org` canonical base
- Documentation is clear and follows existing patterns

## License

This Implementation Guide is published under Creative Commons CC0 1.0 Universal license, allowing unrestricted use, distribution, and reproduction.

## Contact

- **Website**: [eqds.org](https://eqds.org)
- **Email**: equinedatastandard@gmail.com
- **Issues**: Use GitHub Issues for bug reports and feature requests

---

🐎 *Building the future of equine health data interoperability*