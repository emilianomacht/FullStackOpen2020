import patientsData from '../data/patients.json';

import { Patient, NonSensitivePatient, NewPatient } from '../types';
import utils from '../utils';

// const patients: Array<NonSensitivePatient> = patientsData;

const getNonSensitivePatientsData = (): Array<NonSensitivePatient> => {
  return patientsData.map((obj) => utils.toNonSensitivePatient(obj));
};

const addPatient = ( entry: NewPatient): Patient => {

    const newPatient = {
      id: String(Math.max(...patientsData.map(p => Number(p.id))) + 1),
      ...entry,
    };
    patientsData.push(newPatient);
    return newPatient;
};

export default { getNonSensitivePatientsData, addPatient };