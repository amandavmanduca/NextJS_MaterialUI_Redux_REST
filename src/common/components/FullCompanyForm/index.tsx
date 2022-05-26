import React from "react";
import { Divider, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { FormFieldArray } from "../FieldArray";
import { CompanyForm } from "../CompanyForm";
import { baseSchema } from "./companyFormValidation";
import { Company } from "../../types";

const FullCompanyForm = ({
  initialValues,
  onSubmit
}: {
  initialValues: Company
  onSubmit: any
}) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={baseSchema}
        onSubmit={onSubmit}
      >
        {({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => (
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
