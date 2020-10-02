/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewPatient, NonSensitivePatient, OccupationalHealthCareEntry, Patient } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
};

const parseBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {      
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const areEntries = (params: any): params is Entry[] => {
  return Array.isArray(params);
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !areEntries(entries)) {      
    throw new Error('Incorrect or missing gender');
  }
  return entries;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

const toNonSensitivePatient = (object: any): NonSensitivePatient => {
  return {
    name: parseName(object.name),
    id: parseId(object.id),
    dateOfBirth: parseBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

const toPatient = (object: any): Patient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    id: parseId(object.id),
    dateOfBirth: parseBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const areDiagCodes = (params: any): params is string[] => {
  return Array.isArray(params);
};

const parseCodes = (diagCodes: any): string[] => {
  if (!diagCodes || !areDiagCodes(diagCodes)) {      
    throw new Error('Incorrect or missing diagnoses codes');
  }
  return diagCodes;
};

const isHealthCheck = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheck = (healthCheck: any): HealthCheckRating => {
  if (!healthCheck || !isHealthCheck(healthCheck)) {      
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheck;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }
  return employerName;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};


const isEntry = (object: any): object is Entry => {
  let objAsEntry = object as Entry;
  objAsEntry.description = parseDescription(object.description);
  objAsEntry.date = parseDate(object.date);
  objAsEntry.specialist = parseSpecialist(object.specialist);
  if (object.diagnosesCodes) objAsEntry.diagnosisCodes = parseCodes(object.diagnosesCodes);
  if (object.type === 'HealthCheck') {
    objAsEntry = objAsEntry as HealthCheckEntry;
    objAsEntry.healthCheckRating = parseHealthCheck(object.healthCheckRating);
    return true;
  }
  if (object.type === 'OccupationalHealthcare') {
    objAsEntry = objAsEntry as OccupationalHealthCareEntry;
    objAsEntry.employerName = parseEmployerName(object.employerName);
    return true;
  }
  if (object.type === 'Hospital') {
    objAsEntry = objAsEntry as HospitalEntry;
    objAsEntry.discharge.date = parseDate(object.discharge.date);
    objAsEntry.discharge.criteria = parseCriteria(object.discharge.criteria);
    return true;
  }
  return false;
};

const toEntry = (object: any): Entry => {
   if (isEntry(object)) return object;
   else return {} as Entry; 
};

export default { toNewPatient, toNonSensitivePatient, toPatient, toEntry };