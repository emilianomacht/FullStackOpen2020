import React from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { setPatient } from '../state/reducer';
import { Patient } from "../types";
import { Button, Divider, Header, Icon, PlaceholderParagraph } from "semantic-ui-react";
import Entry from "./Entry";
// import AddPatientModal from "../AddPatientModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const SinglePatient = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    /*
    * There seems to be an issue with formik validation. I can't figure it out 
    * because the code is exactly the same as the new patient modal.
    */
    // await axios.get<void>(`${apiBaseUrl}/ping`);
    // console.dir(values);
    // try {
    //   // const { data: newPatient } = await axios.post<Patient>(
    //   //   `${apiBaseUrl}/patients`,
    //   //   values
    //   // );
    //   // dispatch(addPatient(newPatient));
    //   closeModal();
    // } catch (e) {
    //   console.error(e.response.data);
    //   setError(e.response.data.error);
    // }
  };



  const { id } = useParams<{ id: string }>();
  const [{ patientsSensitive }, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
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
      <Divider hidden />
      <Header as="h4">entries</Header>
      {patientsSensitive[id].entries.map((entry) => <Entry entry={entry} key={entry.id} />)}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default SinglePatient;