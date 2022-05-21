import React from "react";
import { Divider, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormFieldArray } from "../FieldArray";
import { CompanyForm } from "../CompanyForm";

// const validationSchema = Yup.object().shape({
//   responsibles: Yup.array().of(
//     Yup.object().shape({
//       firstName: Yup.string().required("First name is required"),
//       lastName: Yup.string().required("Last name is required")
//     })
//   )
// });

// const debug = true;

const FullCompanyForm = ({
  initialValues,
  onSubmit
}: any) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, handleChange, handleBlur, isValid, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            <CompanyForm
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

export default FullCompanyForm;
