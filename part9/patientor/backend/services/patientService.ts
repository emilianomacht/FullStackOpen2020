import patientsData from '../data/patients';

import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';
import utils from '../utils';

// const patients: Array<NonSensitivePatient> = patientsData;

const getNonSensitivePatientsData = (): Array<NonSensitivePatient> => {
  return patientsData.map((obj) => utils.toNonSensitivePatient(obj));
};

const findPatientById = (id: string): Patient | null => {
  const patientFound = patientsData.find(p => p.id === id);
  if (!patientFound) return null;
  return utils.toPatient(patientFound);
};

const addPatient = (entry: NewPatient): Patient => {

    const newPatient = {
      id: String(Math.max(...patientsData.map(p => Number(p.id))) + 1),
      ...entry,
    };
    patientsData.push(newPatient);
    return newPatient;
};

const addEntry = (entry: Entry, id: string): Entry => {
  const patient = findPatientById(id);
  if (patient) {
    entry = {
      ...entry,
      id: String(`${patient.entries.map(e => String(e.id))[0]}a`),
    };
  }
  if (patient && entry) {
    patient.entries.push(entry);
    return entry;
  } else {
    return {} as Entry;
  }
};

export default { getNonSensitivePatientsData, addPatient, findPatientById, addEntry };