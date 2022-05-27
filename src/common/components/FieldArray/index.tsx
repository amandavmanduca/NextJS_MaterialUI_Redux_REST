import { Button, Grid } from "@mui/material";
import { FieldArray } from "formik";
import { ResponsibleForm } from "../ResponsibleForm";

export const FormFieldArray = ({
    arrayName,
    valuesArray,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
}: any) => {
    return (
        <FieldArray name={arrayName}>
        {({ push, remove }) => (
          <div>
            {valuesArray?.map((p: any, index: number) => {
              return (
                <div key={p.id} style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '30px' }}>Responsável #{index+1}</h3>
                    <Grid container gap="20px">
                      <ResponsibleForm
                          p={p}
                          arrayName={arrayName}
                          index={index}
                          errors={errors}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          touched={touched}
                          setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() => remove(index)}
                    >
                        Remover Responsável {index+1}
                    </Button>
                </div>
              );
            })}
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                push({
                    id: Math.random(),
                    name: "",
                    telephone: "",
                    address: {
                      cep: "",
                      state: "",
                      city: "",
                      neighborhood: "",
                      street: "",
                      number: "",
                      complement: "",
                    },
                    isPlaceMainResponsible: false,
                })
              }
            >
              + Adicionar Responsável
            </Button>
          </div>
        )}
      </FieldArray>
    )
}