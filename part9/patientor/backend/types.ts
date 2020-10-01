/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female'
}

interface Entry {
  
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string,
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;