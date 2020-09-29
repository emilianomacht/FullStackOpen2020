import diagnosesData from '../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnosesData = (): Array<Diagnose> => {
  return diagnoses;
};

export default { getDiagnosesData };