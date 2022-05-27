import { getIn } from "formik"
import { FormTextField } from "../TextField"

export const CompanyForm = ({
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
}: any) => {
    return (
        <>
            <FormTextField
                label="Nome"
                name="name"
                value={values?.name}
                touched={getIn(touched, "name")}
                error={getIn(errors, "name")}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="CNPJ"
                name="cnpj"
                value={values?.cnpj}
                touched={getIn(touched, "cnpj")}
                error={getIn(errors, "cnpj")}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Descrição"
                name="description"
                value={values?.description}
                touched={getIn(touched, "description")}
                error={getIn(errors, "description")}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
        </>
    )
}