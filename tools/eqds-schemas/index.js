// EQDS Schemas - Generated from FHIR StructureDefinitions
const fs = require('fs');
const path = require('path');

// Dynamic loading of all schema files
const schemasDir = path.join(__dirname, 'schemas');
const schemas = {};

if (fs.existsSync(schemasDir)) {
  const schemaFiles = fs.readdirSync(schemasDir).filter(f => f.endsWith('.schema.json'));
  
  for (const file of schemaFiles) {
    const name = file.replace('.schema.json', '');
    schemas[name] = require(path.join(schemasDir, file));
  }
}

module.exports = {
  schemas,
  // Individual schema exports for convenience
  equinePatient: schemas['equine-patient'],
  equineObservation: schemas['equine-observation'],
  equineMedicationAdministration: schemas['equine-medication-administration'],
  equineImmunization: schemas['equine-immunization'],
  equineProcedure: schemas['equine-procedure'],
  equinePractitioner: schemas['equine-practitioner'],
  equineOrganization: schemas['equine-organization']
};