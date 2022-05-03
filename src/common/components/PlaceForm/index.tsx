import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik, getIn } from "formik"
import { useEffect, useState } from "react";
import { useListCompanies } from "../../../features/companies/hooks/useListCompanies";
import { searchCep } from "../../hooks/useSearchCep";
import { FormTextField } from "../TextField"


export const PlaceForm = ({
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    setFieldValue
}: any) => {
    async function getAddress(cep: string) {
        let address = null
        if (cep.length === 8) {
            address = await searchCep(cep);
        }
        if (address) {
            values.address.state = address.uf
            values.address.city = address.localidade
            values.address.street = address.logradouro
            values.address.neighborhood = address.bairro
        } else {
            values.address.state = ''
            values.address.city = ''
            values.address.street = ''
            values.address.neighborhood = ''
        }
    }
    useEffect(() => {
        if(values?.address?.cep) {
            getAddress(values.address.cep)
        }
    }, [values?.address?.cep])
    const { data: companiesData, listCompanies } = useListCompanies()

    useEffect(() => {
        listCompanies()
    }, [])
    const [companiesArray, setCompaniesArray] = useState<any[]>([]);
    useEffect(() => {
        if(companiesData) {
            const array: any[] = companiesData?.map((c: any) => ({
                value: c.id,
                label: c.name
            }))
            setCompaniesArray(array)
        }
    }, [companiesData])
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
            <FormControl style={{ width: '100%', padding: '20px', marginTop: '10px' }}>
                <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={values?.company?.id}
                    label="Empresa"
                    onChange={(value: any) => setFieldValue(`company.id`, value.target.value)}
                >
                    {companiesArray?.map(c => (
                        <MenuItem key={c.value} style={{ padding: '5px 10px', width: '100%' }} value={c.value}>{c.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormTextField
                label="CEP"
                name={`address.cep`}
                value={values?.address?.cep}
                touched={getIn(touched, `address.cep`)}
                error={getIn(errors, `address.cep`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Estado"
                name={`address.state`}
                value={values?.address?.state}
                touched={getIn(touched, `address.state`)}
                error={getIn(errors, `address.state`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Cidade"
                name={`address.city`}
                value={values?.address?.city}
                touched={getIn(touched, `address.city`)}
                error={getIn(errors, `address.city`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Bairro"
                name={`address.neighborhood`}
                value={values?.address?.neighborhood}
                touched={getIn(touched, `address.neighborhood`)}
                error={getIn(errors, `address.neighborhood`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Logradouro"
                name={`address.street`}
                value={values?.address?.street}
                touched={getIn(touched, `address.street`)}
                error={getIn(errors, `address.street`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
                readOnly={true}
            />
            <FormTextField
                label="Nº"
                name={`address.number`}
                value={values?.address?.number}
                touched={getIn(touched, `address.number`)}
                error={getIn(errors, `address.number`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormTextField
                label="Complemento"
                name={`address.complement`}
                value={values?.address?.complement}
                touched={getIn(touched, `address.complement`)}
                error={getIn(errors, `address.complement`)}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
        </>
    )
}