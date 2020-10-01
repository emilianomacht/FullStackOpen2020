import React from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";
import { Header, Icon, PlaceholderParagraph } from "semantic-ui-react";

const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsSensitive }, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };

    if (!patientsSensitive[id]) fetchPatient();
  }, [dispatch]);

  if (!patientsSensitive[id]) return null;

  const genderIcon = patientsSensitive[id].gender === 'male' ? 'mars'
  : patientsSensitive[id].gender === 'female' ? 'venus'
  : 'genderless';

  return (
    <>
      <Header as="h2">
        {patientsSensitive[id].name}
        <Icon name={genderIcon} size="small" />
      </Header>
      <PlaceholderParagraph>ssn: {patientsSensitive[id].ssn}</PlaceholderParagraph>
      <PlaceholderParagraph>occupation: {patientsSensitive[id].occupation}</PlaceholderParagraph>
    </>
  );
};

export default SinglePatient;