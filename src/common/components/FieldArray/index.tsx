import { Button, TextField } from "@mui/material";
import { FieldArray, getIn } from "formik";
import { searchCep } from "../../hooks/useSearchCep";
import { ResponsibleForm } from "../ResponsibleForm";
import { FormTextField } from "../TextField";


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
                <div key={p.id}>
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
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() => remove(index)}
                    >
                        Remover
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
              Adicionar Responsável
            </Button>
          </div>
        )}
      </FieldArray>
    )
}