import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patientsNonSensitive: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patientsNonSensitive
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patientsNonSensitive: {
          ...state.patientsNonSensitive,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patientsSensitive: {
          ...state.patientsSensitive,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { 
    type: 'SET_PATIENT_LIST', 
    payload: patientListFromApi,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const setPatient = (patientFromApi: Patient): Action => {
  return { type: "SET_PATIENT", payload: patientFromApi };
};
