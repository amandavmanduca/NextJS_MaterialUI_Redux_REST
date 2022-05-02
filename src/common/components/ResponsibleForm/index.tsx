import { getIn } from "formik"
import { useEffect } from "react"
import { searchCep } from "../../hooks/useSearchCep"
import { FormTextField } from "../TextField"


export const ResponsibleForm = ({
    p,
    index,
    arrayName,
    touched,
    errors,
    handleChange,
    handleBlur,
}: any) => {

    async function getAddress(cep: string) {
        let address = null
        if (cep.length === 8) {
            address = await searchCep(cep);
        }
        if (address) {
            p.state = address.uf
            p.city = address.localidade
            p.street = address.logradouro
            p.neighborhood = address.bairro
        } else {
            p.state = ''
            p.city = ''
            p.street = ''
            p.neighborhood = ''
        }
    }

    useEffect(() => {
        getAddress(p.cep)
    }, [p.cep])

    return (
        <>
            <FormTextField
                label="Nome"
                name={`${arrayName}[${index}].name`}
                value={p.name}
                touched={getIn(touched, `${arrayName}[${index}].name`)}
                error={getIn(errors, `${arrayName}[${index}].name`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Telefone"
                name={`${arrayName}[${index}].telephone`}
                value={p.telephone}
                touched={getIn(touched, `${arrayName}[${index}].telephone`)}
                error={getIn(errors, `${arrayName}[${index}].telephone`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="CEP"
                name={`${arrayName}[${index}].cep`}
                value={p.cep}
                touched={getIn(touched, `${arrayName}[${index}].cep`)}
                error={getIn(errors, `${arrayName}[${index}].cep`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Estado"
                name={`${arrayName}[${index}].state`}
                value={p.state}
                touched={getIn(touched, `${arrayName}[${index}].state`)}
                error={getIn(errors, `${arrayName}[${index}].state`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Cidade"
                name={`${arrayName}[${index}].city`}
                value={p.city}
                touched={getIn(touched, `${arrayName}[${index}].city`)}
                error={getIn(errors, `${arrayName}[${index}].city`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Bairro"
                name={`${arrayName}[${index}].neighborhood`}
                value={p.neighborhood}
                touched={getIn(touched, `${arrayName}[${index}].neighborhood`)}
                error={getIn(errors, `${arrayName}[${index}].neighborhood`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Logradouro"
                name={`${arrayName}[${index}].street`}
                value={p.street}
                touched={getIn(touched, `${arrayName}[${index}].street`)}
                error={getIn(errors, `${arrayName}[${index}].street`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Nº"
                name={`${arrayName}[${index}].number`}
                value={p.number}
                touched={getIn(touched, `${arrayName}[${index}].number`)}
                error={getIn(errors, `${arrayName}[${index}].number`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Complemento"
                name={`${arrayName}[${index}].complement`}
                value={p.complement}
                touched={getIn(touched, `${arrayName}[${index}].complement`)}
                error={getIn(errors, `${arrayName}[${index}].complement`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
        </>
    )
}