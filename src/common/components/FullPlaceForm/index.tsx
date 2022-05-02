import React from "react";
import { Divider, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormFieldArray } from "../FieldArray";
import { PlaceForm } from "../PlaceForm";

// const validationSchema = Yup.object().shape({
//   responsibles: Yup.array().of(
//     Yup.object().shape({
//       firstName: Yup.string().required("First name is required"),
//       lastName: Yup.string().required("Last name is required")
//     })
//   )
// });

// const debug = true;

const FullPlaceForm = ({
  initialValues,
  onSubmit
}: any) => {
  return (
    <div>
      <Formik
        initialValues={initialValues ?? {
            name: '',
            address: {
                cep: '',
                state: '',
                city: '',
                street: '',
                neighborhood: '',
                number: '',
                complement: '',
            },
            responsibles: []
        }}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
          <Form noValidate autoComplete="off">
            <PlaceForm
                touched={touched}
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormFieldArray
                arrayName="responsibles"
                valuesArray={values.responsibles}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
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
