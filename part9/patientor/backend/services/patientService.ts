import patientsData from '../data/patients.json';

import { Patient, NonSensitivePatient } from '../types';

// const patients: Array<NonSensitivePatient> = patientsData;

const getNonSensitivePatientsData = (): Array<NonSensitivePatient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
    id,
    name,
    dateOfBirth,
    gender,
    occupation
   }));
};

const addPatient = (
  name: string, ssn: string, dateOfBirth: string, occupation: string, gender: string
  ): Patient => {

    const newPatient = {
      id: String(Math.max(...patientsData.map(p => Number(p.id))) + 1),
      name,
      ssn,
      dateOfBirth,
      occupation,
      gender,
    };
    patientsData.push(newPatient);
    return newPatient;
} 

export default { getNonSensitivePatientsData, addPatient };