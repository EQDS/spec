/**
 * EQDS Schema Generator
 * Converts FHIR StructureDefinitions to JSON Schemas
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import * as yaml from 'js-yaml';

interface FHIRProfile {
  resourceType: string;
  id: string;
  url: string;
  name: string;
  title: string;
  type: string;
  baseDefinition: string;
  differential: {
    element: Array<{
      id: string;
      path: string;
      sliceName?: string;
      min?: number;
      max?: string;
      type?: Array<{
        code: string;
        profile?: string[];
      }>;
      fixedCodeableConcept?: any;
      binding?: {
        strength: string;
        valueSet: string;
      };
    }>;
  };
}

interface JSONSchema {
  $schema: string;
  $id: string;
  title: string;
  description: string;
  type: string;
  properties: Record<string, any>;
  required: string[];
  definitions?: Record<string, any>;
}

/**
 * Parse Jekyll front matter and extract JSON content
 */
function parseJekyllFile(filePath: string): any {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  if (lines[0] !== '---') {
    throw new Error(`File ${filePath} does not have Jekyll front matter`);
  }
  
  let frontMatterEnd = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      frontMatterEnd = i;
      break;
    }
  }
  
  if (frontMatterEnd === -1) {
    throw new Error(`File ${filePath} does not have proper Jekyll front matter`);
  }
  
  const jsonContent = lines.slice(frontMatterEnd + 1).join('\n').trim();
  return JSON.parse(jsonContent);
}

/**
 * Convert FHIR StructureDefinition to JSON Schema
 */
function convertToJSONSchema(profile: FHIRProfile): JSONSchema {
  const schema: JSONSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: `${profile.url.replace('/StructureDefinition/', '/schemas/')}.schema.json`,
    title: profile.title,
    description: `JSON Schema for ${profile.title}`,
    type: "object",
    properties: {
      resourceType: {
        type: "string",
        const: profile.type
      },
      id: {
        type: "string",
        pattern: "^[A-Za-z0-9\\-\\.]{1,64}$"
      },
      meta: {
        type: "object",
        properties: {
          profile: {
            type: "array",
            items: { type: "string" },
            contains: { const: profile.url }
          }
        }
      }
    },
    required: ["resourceType"]
  };

  // Add Patient-specific properties
  if (profile.type === 'Patient') {
    schema.properties.identifier = {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          type: { 
            type: "object",
            properties: {
              coding: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    system: { type: "string" },
                    code: { type: "string" },
                    display: { type: "string" }
                  }
                }
              },
              text: { type: "string" }
            }
          },
          system: { type: "string" },
          value: { type: "string" }
        },
        required: ["value"]
      }
    };

    schema.properties.name = {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          use: {
            type: "string",
            enum: ["usual", "official", "temp", "nickname", "anonymous", "old", "maiden"]
          },
          text: { type: "string" },
          given: {
            type: "array",
            items: { type: "string" }
          }
        }
      }
    };

    schema.properties.gender = {
      type: "string",
      enum: ["male", "female", "other", "unknown"]
    };

    schema.properties.birthDate = {
      type: "string",
      pattern: "^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$"
    };

    schema.required.push("identifier", "name");
  }

  // Process differential elements to add extensions and constraints
  const extensionProperties: any[] = [];
  let hasAnimalExtension = false;

  for (const element of profile.differential.element) {
    if (element.id === 'Patient.extension:animal') {
      hasAnimalExtension = true;
      extensionProperties.push({
        $ref: "#/definitions/animalExtension"
      });
    } else if (element.id === 'Patient.extension:color') {
      extensionProperties.push({
        $ref: "#/definitions/colorExtension"
      });
    }
  }

  if (extensionProperties.length > 0) {
    schema.properties.extension = {
      type: "array",
      items: {
        oneOf: extensionProperties
      }
    };
    
    if (hasAnimalExtension) {
      (schema.properties.extension as any).contains = {
        $ref: "#/definitions/animalExtension"
      };
      schema.required.push("extension");
    }
  }

  // Add definitions for extensions
  schema.definitions = {};

  if (hasAnimalExtension) {
    schema.definitions.animalExtension = {
      type: "object",
      properties: {
        url: {
          const: "http://hl7.org/fhir/StructureDefinition/patient-animal"
        },
        extension: {
          type: "array",
          items: {
            oneOf: [
              {
                type: "object",
                properties: {
                  url: { const: "species" },
                  valueCodeableConcept: {
                    type: "object",
                    properties: {
                      coding: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            system: { const: "http://snomed.info/sct" },
                            code: { const: "35354009" },
                            display: { const: "Horse (organism)" }
                          },
                          required: ["system", "code", "display"]
                        }
                      }
                    },
                    required: ["coding"]
                  }
                },
                required: ["url", "valueCodeableConcept"]
              },
              {
                type: "object",
                properties: {
                  url: { const: "breed" },
                  valueCodeableConcept: {
                    type: "object",
                    properties: {
                      coding: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            system: { const: "https://eqds.org/CodeSystem/breed-codes" },
                            code: { type: "string" },
                            display: { type: "string" }
                          },
                          required: ["system", "code", "display"]
                        }
                      }
                    },
                    required: ["coding"]
                  }
                },
                required: ["url", "valueCodeableConcept"]
              },
              {
                type: "object",
                properties: {
                  url: { const: "genderStatus" },
                  valueCodeableConcept: {
                    type: "object",
                    properties: {
                      coding: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            system: { const: "https://eqds.org/CodeSystem/equine-sex" },
                            code: {
                              type: "string",
                              enum: ["stallion", "mare", "gelding", "colt", "filly"]
                            },
                            display: { type: "string" }
                          },
                          required: ["system", "code", "display"]
                        }
                      }
                    },
                    required: ["coding"]
                  }
                },
                required: ["url", "valueCodeableConcept"]
              }
            ]
          },
          contains: [
            { properties: { url: { const: "species" } } },
            { properties: { url: { const: "breed" } } },
            { properties: { url: { const: "genderStatus" } } }
          ]
        }
      },
      required: ["url", "extension"]
    };
  }

  // Add color extension if referenced
  if (extensionProperties.some(ep => ep.$ref === "#/definitions/colorExtension")) {
    schema.definitions.colorExtension = {
      type: "object",
      properties: {
        url: {
          const: "https://eqds.org/StructureDefinition/equine-color"
        },
        valueCodeableConcept: {
          type: "object",
          properties: {
            coding: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  system: { const: "https://eqds.org/CodeSystem/color-codes" },
                  code: { type: "string" },
                  display: { type: "string" }
                },
                required: ["system", "code", "display"]
              }
            }
          },
          required: ["coding"]
        }
      },
      required: ["url", "valueCodeableConcept"]
    };
  }

  return schema;
}

/**
 * Main generation function
 */
async function generateSchemas(): Promise<void> {
  console.log('🐎 EQDS Schema Generator');
  console.log('Converting FHIR StructureDefinitions to JSON Schemas...\n');

  // Find all profile files
  const profileFiles = await glob('../../../docs/profiles/*.json', { cwd: __dirname });
  
  if (profileFiles.length === 0) {
    throw new Error('No FHIR profile files found in docs/profiles/');
  }

  // Create output directory
  const outputDir = path.resolve(__dirname, '../../../tools/eqds-schemas/schemas');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const profileFile of profileFiles) {
    try {
      console.log(`Processing: ${path.basename(profileFile)}`);
      
      const fullPath = path.resolve(__dirname, profileFile);
      const profile: FHIRProfile = parseJekyllFile(fullPath);
      
      const schema = convertToJSONSchema(profile);
      const schemaFileName = `${profile.id}.schema.json`;
      const outputPath = path.join(outputDir, schemaFileName);
      
      fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));
      console.log(`✅ Generated: ${schemaFileName}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${profileFile}:`, error);
    }
  }
  
  console.log('\n🎉 Schema generation complete!');
}

// Run if called directly
if (require.main === module) {
  generateSchemas().catch(console.error);
}

export { generateSchemas };