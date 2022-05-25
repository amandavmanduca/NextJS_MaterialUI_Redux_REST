import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik, getIn } from "formik"
import { useEffect, useState } from "react";
import { useListCompanies } from "../../../features/companies/hooks/useListCompanies";
import { useGetUsers } from "../../../features/places/hooks/useGetUsers";
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
    const [handleCepValidation, setHandleCepValidation] = useState<string | null>(null)
    async function getAddress(cep: string) {
        let address = null
        if (cep.length === 8) {
            address = await searchCep(cep);
        }
        if (address) {
            if (address.erro !== 'true') {
                setHandleCepValidation(null)
                values.address.state = address.uf
                values.address.city = address.localidade
                values.address.street = address.logradouro
                values.address.neighborhood = address.bairro
            } else {
                setHandleCepValidation('CEP inválido')
                values.address.state = ''
                values.address.city = ''
                values.address.street = ''
                values.address.neighborhood = ''
            }
        }
    }

    useEffect(() => {
        if(values?.address?.cep) {
            getAddress(values.address.cep)
        }
    }, [values?.address?.cep])

    const { data: companiesData, listCompanies } = useListCompanies()
    const { data: usersData, getUsers } = useGetUsers()

    useEffect(() => {
        listCompanies()
        getUsers()
    }, [])

    const [companiesArray, setCompaniesArray] = useState<any[]>([]);
    const [usersArray, setUsersArray] = useState<any[]>([]);

    useEffect(() => {
        if(companiesData) {
            const array: any[] = companiesData?.map((c: any) => ({
                value: c.id,
                label: c.name
            }))
            setCompaniesArray(array)
        }
        if(usersData) {
            const array: any[] = usersData?.map((c: any) => ({
                value: c.id,
                label: c.name
            }))
            setUsersArray(array)
        }
    }, [companiesData, usersData])

    return (
        <>
            {values?.id !== undefined && (
                <FormControl style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Usuário Responsável por atender alteração</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select"
                        variant="outlined"
                        value={values?.attendant_userId}
                        label="Usuário Responsável por atender alteração"
                        onChange={(value: any) => setFieldValue(`attendant_userId`, value.target.value)}
                        error={getIn(errors, "attendant_userId")}
                    >
                        {usersArray?.map(c => (
                            <MenuItem key={c.value} style={{ width: '100%' }} value={c.value}>{c.label}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText style={{ color: '#d32f2f' }}>{getIn(errors, "attendant_userId")}</FormHelperText>
                </FormControl>
            )}
            <FormTextField
                label="Nome"
                name="name"
                value={values?.name}
                touched={getIn(touched, "name")}
                error={getIn(errors, "name")}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            <FormControl style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Empresa</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={values?.company?.id}
                    label="Empresa"
                    onChange={(value: any) => setFieldValue(`company.id`, value.target.value)}
                    error={getIn(errors, "company.id")}
                >
                    {companiesArray?.map(c => (
                        <MenuItem key={c.value} style={{ width: '100%' }} value={c.value}>{c.label}</MenuItem>
                    ))}
                </Select>
                <FormHelperText style={{ color: '#d32f2f' }}>{getIn(errors, "company.id")}</FormHelperText>
            </FormControl>
            <FormTextField
                label="CEP"
                name={`address.cep`}
                value={values?.address?.cep}
                touched={getIn(touched, `address.cep`)}
                error={getIn(errors, `address.cep`) || handleCepValidation}
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