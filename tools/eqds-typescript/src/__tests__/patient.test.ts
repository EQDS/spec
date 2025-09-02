/**
 * Tests for EQDS Patient creation and validation
 */

import {
  createEqdsPatient,
  createPatientFromExample,
  createTestPatient,
  assertEqdsPatient,
  validateEqdsPatient,
  getOwnershipTotal,
  getAnimalInfo,
  getColorInfo,
  getBreedingInfo,
  getOwners,
  EquineSex,
  BreedCode,
  EQDS_URLS
} from '../index';

describe('EQDS Patient Creation and Validation', () => {
  test('should create a minimal valid EQDS patient', () => {
    const patient = createEqdsPatient({
      id: 'test-1',
      name: 'Test Mare',
      genderStatus: 'mare'
    });

    expect(patient.resourceType).toBe('Patient');
    expect(patient.id).toBe('test-1');
    expect(patient.name[0].text).toBe('Test Mare');
    expect(patient.meta?.profile).toContain(EQDS_URLS.PROFILE_PATIENT);

    // Should have animal extension
    const animalExt = patient.extension.find(ext => 
      ext.url === "http://hl7.org/fhir/StructureDefinition/patient-animal"
    );
    expect(animalExt).toBeDefined();

    // Should not throw validation error
    expect(() => assertEqdsPatient(patient)).not.toThrow();
  });

  test('should create patient with all optional fields', () => {
    const patient = createEqdsPatient({
      id: 'full-test',
      name: 'Thunder Bay',
      barnName: 'Thunder',
      genderStatus: 'stallion',
      breed: 'TB',
      color: 'bay',
      birthDate: '2018-04-15',
      owners: [
        { reference: 'RelatedPerson/owner-1', percentage: 75 },
        { reference: 'RelatedPerson/owner-2', percentage: 25 }
      ],
      sire: 'Famous Stallion',
      dam: 'Great Mare',
      identifiers: [
        { system: 'http://jockey-club.com', value: '123456', type: 'Jockey Club' }
      ]
    });

    expect(patient.name[0].given).toEqual(['Thunder']);
    expect(patient.birthDate).toBe('2018-04-15');
    expect(getOwnershipTotal(patient)).toBe(100);
    
    const breedingInfo = getBreedingInfo(patient);
    expect(breedingInfo?.sire).toBe('Famous Stallion');
    expect(breedingInfo?.dam).toBe('Great Mare');

    const colorInfo = getColorInfo(patient);
    expect(colorInfo?.code).toBe('bay');

    expect(() => assertEqdsPatient(patient)).not.toThrow();
  });

  test('should create patient from EQDS example', () => {
    const patient = createPatientFromExample();
    
    expect(patient.id).toBe('example-horse-01');
    expect(patient.name[0].text).toBe('Smart Little Pepto');
    expect(patient.name[0].given).toEqual(['Pepto']);
    expect(getOwnershipTotal(patient)).toBe(100);
    
    const animalInfo = getAnimalInfo(patient);
    expect(animalInfo?.genderStatus?.code).toBe('stallion');
    expect(animalInfo?.breed?.code).toBe('QH');
    expect(animalInfo?.species?.code).toBe('35354009');

    expect(() => assertEqdsPatient(patient)).not.toThrow();
  });

  test('should reject patient with invalid ownership total', () => {
    expect(() => {
      createEqdsPatient({
        id: 'invalid-ownership',
        name: 'Invalid Horse',
        genderStatus: 'mare',
        owners: [
          { reference: 'RelatedPerson/owner-1', percentage: 60 },
          { reference: 'RelatedPerson/owner-2', percentage: 25 } // Only 85% total
        ]
      });
    }).toThrow('Ownership percentages must sum to approximately 100%');
  });

  test('should validate all equine sex options', () => {
    const sexOptions: EquineSex[] = ['stallion', 'mare', 'gelding', 'colt', 'filly'];
    
    sexOptions.forEach(sex => {
      const patient = createTestPatient(`test-${sex}`, sex, 'QH');
      expect(() => assertEqdsPatient(patient)).not.toThrow();
      
      const animalInfo = getAnimalInfo(patient);
      expect(animalInfo?.genderStatus?.code).toBe(sex);
    });
  });

  test('should validate all breed codes', () => {
    const breedCodes: BreedCode[] = ['QH', 'TB', 'AR', 'PT', 'AP', 'WB'];
    
    breedCodes.forEach(breed => {
      const patient = createTestPatient(`test-${breed}`, 'mare', breed);
      expect(() => assertEqdsPatient(patient)).not.toThrow();
      
      const animalInfo = getAnimalInfo(patient);
      expect(animalInfo?.breed?.code).toBe(breed);
    });
  });

  test('should handle ownership extraction correctly', () => {
    const patient = createEqdsPatient({
      id: 'ownership-test',
      name: 'Shared Horse',
      genderStatus: 'gelding',
      owners: [
        { reference: 'RelatedPerson/owner-a', percentage: 40 },
        { reference: 'RelatedPerson/owner-b', percentage: 35 },
        { reference: 'RelatedPerson/owner-c', percentage: 25 }
      ]
    });

    const owners = getOwners(patient);
    expect(owners).toHaveLength(3);
    expect(owners[0].percentage).toBe(40);
    expect(owners[0].reference).toBe('RelatedPerson/owner-a');
    
    expect(getOwnershipTotal(patient)).toBe(100);
  });

  test('should validate business rules correctly', () => {
    const validPatient = createTestPatient('valid-1', 'mare');
    const validation = validateEqdsPatient(validPatient);
    
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('should detect invalid patients', () => {
    const invalidPatient = {
      resourceType: 'Patient',
      id: 'invalid-1',
      // Missing required fields and extensions
    };

    const validation = validateEqdsPatient(invalidPatient);
    expect(validation.valid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });

  test('should handle patients without extensions', () => {
    const patientWithoutExtensions = {
      resourceType: 'Patient',
      id: 'no-extensions',
      identifier: [{ value: 'test' }],
      name: [{ text: 'Test' }]
      // Missing extensions array
    };

    const validation = validateEqdsPatient(patientWithoutExtensions);
    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain('Patient must have extensions array');
  });

  test('should validate EQDS profile requirement', () => {
    const patient = createTestPatient('profile-test', 'stallion');
    
    // Remove profile to make it invalid
    if (patient.meta) {
      patient.meta.profile = [];
    }

    const validation = validateEqdsPatient(patient);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some(e => e.includes('EQDS profile'))).toBe(true);
  });
});