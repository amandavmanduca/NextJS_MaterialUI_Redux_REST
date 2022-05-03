import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
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
    setFieldValue,
}: any) => {

    async function getAddress(cep: string) {
        let address = null
        if (cep?.length === 8) {
            address = await searchCep(cep);
        }
        if (address) {
            p.address.state = address.uf
            p.address.city = address.localidade
            p.address.street = address.logradouro
            p.address.neighborhood = address.bairro
        } else {
            p.address.state = ''
            p.address.city = ''
            p.address.street = ''
            p.address.neighborhood = ''
        }
    }

    useEffect(() => {
        getAddress(p?.address?.cep)
    }, [p?.address?.cep])

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
                name={`${arrayName}[${index}].address.cep`}
                value={p.address.cep}
                touched={getIn(touched, `${arrayName}[${index}].address.cep`)}
                error={getIn(errors, `${arrayName}[${index}].address.cep`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Estado"
                name={`${arrayName}[${index}].address.state`}
                value={p.address.state}
                touched={getIn(touched, `${arrayName}[${index}].address.state`)}
                error={getIn(errors, `${arrayName}[${index}].address.state`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Cidade"
                name={`${arrayName}[${index}].address.city`}
                value={p.address.city}
                touched={getIn(touched, `${arrayName}[${index}].address.city`)}
                error={getIn(errors, `${arrayName}[${index}].address.city`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Bairro"
                name={`${arrayName}[${index}].address.neighborhood`}
                value={p.address.neighborhood}
                touched={getIn(touched, `${arrayName}[${index}].address.neighborhood`)}
                error={getIn(errors, `${arrayName}[${index}].address.neighborhood`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Logradouro"
                name={`${arrayName}[${index}].address.street`}
                value={p.address.street}
                touched={getIn(touched, `${arrayName}[${index}].address.street`)}
                error={getIn(errors, `${arrayName}[${index}].address.street`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Nº"
                name={`${arrayName}[${index}].address.number`}
                value={p.address.number}
                touched={getIn(touched, `${arrayName}[${index}].address.number`)}
                error={getIn(errors, `${arrayName}[${index}].address.number`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Complemento"
                name={`${arrayName}[${index}].address.complement`}
                value={p.address.complement}
                touched={getIn(touched, `${arrayName}[${index}].address.complement`)}
                error={getIn(errors, `${arrayName}[${index}].address.complement`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormGroup style={{ padding: '20px' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={p.isPlaceMainResponsible}
                            onChange={(value) => setFieldValue(`${arrayName}[${index}].isPlaceMainResponsible`, value.target.value === 'on' ? true : false)}
                        />
                    }
                    label="Responsável Principal"
                />
            </FormGroup>
        </>
    )
}