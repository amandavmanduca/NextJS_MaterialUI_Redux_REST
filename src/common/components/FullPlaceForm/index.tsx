import React from "react";
import { Divider, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormFieldArray } from "../FieldArray";
import { PlaceForm } from "../PlaceForm";
import { createValidationSchema, updateValidationSchema } from "./placeFormValidation";

const FullPlaceForm = ({
  initialValues,
  onSubmit
}: any) => {
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
            <PlaceForm
                touched={touched}
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
            />
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
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FullPlaceForm;
