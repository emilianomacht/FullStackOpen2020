export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export interface NonSensitivePatient {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string
}