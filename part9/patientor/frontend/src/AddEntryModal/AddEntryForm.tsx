import { Field, Formik } from "formik";
import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, TextField, TypeSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state/state";
import { BaseEntry, Entry } from "../types";

export type EntryFormValues = Omit<BaseEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = React.useState<"Hospital" | "OccupationalHealthcare" | "HealthCheck">("Hospital");

  const setTypeHandler = (p: any) => { setEntryType(p); };

  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: entryType,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
      }}
      onSubmit={onSubmit}
      // validate={() => ({})}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
    {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          <TypeSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            types={['HealthCheck', 'OccupationalHealthcare', 'Hospital']}
            setTypeHandler={setTypeHandler}
          />
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder=""
            name="description"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder=""
            name="specialist"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          {entryType === 'HealthCheck' ? 
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            /> 
          : entryType === 'OccupationalHealthcare' ?
          <>
            <Field
              label="Employer Name"
              placeholder="Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave - Start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave - Start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
          : entryType === 'Hospital' ?
          <>
            <Field
              label="Discharge - Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge - Criteria"
              placeholder=""
              name="discharge.criteria"
              component={TextField}
            />
          </>
          : null}
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                floated="right"
                color="green"
                type="submit"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;