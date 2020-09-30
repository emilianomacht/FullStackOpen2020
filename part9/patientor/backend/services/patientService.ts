import patientsData from '../data/patients.json';

import { NonSensitivePatient } from '../types';

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

export default { getNonSensitivePatientsData };