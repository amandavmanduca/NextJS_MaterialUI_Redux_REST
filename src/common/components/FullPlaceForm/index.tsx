import React from "react";
import { Divider, Button } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import { Form, Formik } from "formik";
import { FormFieldArray } from "../FieldArray";
import { PlaceForm } from "../PlaceForm";
import { createValidationSchema, updateValidationSchema } from "./placeFormValidation";
import { Place } from "../../types";

const FullPlaceForm = ({
  initialValues,
  onSubmit
}: {
  initialValues: Place;
  onSubmit: any;
}) => {
  const currentSchema = initialValues?.id ? updateValidationSchema : createValidationSchema
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={currentSchema}
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            <Grid container gap="20px">
              <PlaceForm
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
              />
              <Divider style={{ marginTop: 5, marginBottom: 5 }} />
              <FormFieldArray
                  arrayName="responsibles"
                  valuesArray={values?.responsibles}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Enviar
              </Button>
            </Grid>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FullPlaceForm;
