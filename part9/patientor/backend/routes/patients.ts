import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientsData());
});

router.post('/', (req, res) => {
  // const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  // const newPatient = patientService.addPatient({
  //   name,
  //   ssn,
  //   dateOfBirth,
  //   occupation,
  //   gender,
  // });
  const newPatient = utils.toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;