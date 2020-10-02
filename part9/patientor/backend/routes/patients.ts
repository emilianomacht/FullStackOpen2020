import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientsData());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.findPatientById(id));
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  console.log('req.body', req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const entry = utils.toEntry(req.body);
  res.send(patientService.addEntry(entry, id));
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