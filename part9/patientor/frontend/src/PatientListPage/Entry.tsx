import React from 'react';
import { Header, Icon, Message } from 'semantic-ui-react';
import { useStateValue } from '../state/state';
import { Entry } from '../types';

interface EntriesProps {
  entry: Entry;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryComponent: React.FC<EntriesProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Message>
          <Header>{entry.date}</Header>
          <i>{entry.description}</i>
          <p>Specialist: <strong>{entry.specialist}</strong></p>
          {entry.diagnosisCodes ? 
          <ul>
            {entry.diagnosisCodes.map((code, index) => (
              <li key={index}>{code}{' '}{diagnoses[code] ? diagnoses[code].name : null}</li>
            ))}
          </ul>
          : null}
          {/* <p>health check rating: {entry.healthCheckRating}</p> */}
          {entry.healthCheckRating === 0 ? <Icon color='red' name='heart' />
          : entry.healthCheckRating === 1 ? <Icon color='orange' name='heart' />
          : entry.healthCheckRating === 2 ? <Icon color='yellow' name='heart' />
          : entry.healthCheckRating === 3 ? <Icon color='green' name='heart' />
          : null}
        </Message>
      );
    case "OccupationalHealthcare":
      return (
        <Message>
          <Header>{entry.date}</Header>
          <i>{entry.description}</i>
          <p>Specialist: <strong>{entry.specialist}</strong></p>
          <p>Employer name: <strong>{entry.employerName}</strong></p>
          {entry.diagnosisCodes ? 
          <ul>
            {entry.diagnosisCodes.map((code, index) => <li key={index}>{code}{' '}{diagnoses[code] ? diagnoses[code].name : null}</li>)}
          </ul>
          : null}
          {entry.sickLeave ? <p>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> : null}
        </Message>
      );
    case "Hospital":
      return (
        <Message>
          <Header>{entry.date}</Header>
          <i>{entry.description}</i>
          <p>Specialist: <strong>{entry.specialist}</strong></p>
          {entry.diagnosisCodes ? 
          <ul>
            {entry.diagnosisCodes.map((code, index) => <li key={index}>{code}{' '}{diagnoses[code] ? diagnoses[code].name : null}</li>)}
          </ul>
          : null}
          {entry.discharge ? 
          <>
            <p><strong>discharge</strong></p>
            <p>date: <strong>{entry.discharge.date}</strong></p>
            <p>criteria: <strong>{entry.discharge.criteria}</strong></p>
          </> : null}
        </Message>
      );
    default:
      return assertNever(entry);
  }
}

export default EntryComponent;