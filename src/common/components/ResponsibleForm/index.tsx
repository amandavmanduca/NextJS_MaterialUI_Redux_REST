import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { getIn } from "formik"
import { useEffect, useState } from "react"
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
    const [handleCepValidation, setHandleCepValidation] = useState<string | null>(null)
    async function getAddress(cep: string) {
        let address = null
        if (cep?.length === 8) {
            address = await searchCep(cep);
        }
        if (address) {
            if (address.erro !== 'true') {
                setHandleCepValidation(null)
                p.address.state = address.uf
                p.address.city = address.localidade
                p.address.street = address.logradouro
                p.address.neighborhood = address.bairro
            } else {
                setHandleCepValidation('CEP inválido')
                p.address.state = ''
                p.address.city = ''
                p.address.street = ''
                p.address.neighborhood = ''
            }
        }
    }

    useEffect(() => {
        getAddress(p?.address?.cep)
    }, [p?.address?.cep])

    const fieldsData = [
        {
            label: 'Nome',
            name: `${arrayName}[${index}].name`,
            value: p.name,
            info: getIn(errors, `${arrayName}[${index}].name`)
        },
        {
            label: 'Telefone',
            name: `${arrayName}[${index}].telephone`,
            value: p.telephone,
            info: getIn(errors, `${arrayName}[${index}].telephone`)
        },
        {
            label: 'CEP',
            name: `${arrayName}[${index}].address.cep`,
            value: p.address.cep,
            info: getIn(errors, `${arrayName}[${index}].address.cep`) || handleCepValidation
        },
        {
            label: 'Estado',
            name: `${arrayName}[${index}].address.state`,
            value: p.address.state,
            info: getIn(errors, `${arrayName}[${index}].address.state`)
        },
        {
            label: 'Cidade',
            name: `${arrayName}[${index}].address.city`,
            value: p.address.city,
            info: getIn(errors, `${arrayName}[${index}].address.city`)
        },
        {
            label: 'Bairro',
            name: `${arrayName}[${index}].address.neighborhood`,
            value: p.address.neighborhood,
            info: getIn(errors, `${arrayName}[${index}].address.neighborhood`)
        },
        {
            label: 'Logradouro',
            name: `${arrayName}[${index}].address.street`,
            value: p.address.street,
            info: getIn(errors, `${arrayName}[${index}].address.street`)
        },
        {
            label: 'Nº',
            name: `${arrayName}[${index}].address.number`,
            value: p.address.number,
            info: getIn(errors, `${arrayName}[${index}].address.number`)
        },
        {
            label: 'Complemento',
            name: `${arrayName}[${index}].address.complement`,
            value: p.address.complement,
            info: getIn(errors, `${arrayName}[${index}].address.complement`)
        },
    ]

    return (
        <>
            {fieldsData?.map(field => (
                <FormTextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={field.value}
                    touched={field.info}
                    error={field.info}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            ))}
            <FormGroup style={{ padding: '10px 10px' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={p.isPlaceMainResponsible}
                            onChange={() => setFieldValue(`${arrayName}[${index}].isPlaceMainResponsible`, !p.isPlaceMainResponsible)}
                        />
                    }
                    label="Responsável Principal"
                />
            </FormGroup>
        </>
    )
}