import { useEffect } from "react";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import ListTemplate from "../../src/common/templates/ListTemplate";
import { useListCompanies } from "../../src/features/companies/hooks/useListCompanies";

const Companies = (): React.ReactNode => {
    const { data, listCompanies } = useListCompanies();

    useEffect(() => {
        listCompanies()
    }, [])

    const values = data?.map((company: any) => ([
        {
            label: 'id',
            value: company.id,
        },
        {
            label: 'Nome',
            value: company.name,
        },
        {
            label: 'CNPJ',
            value: company.cnpj,
        },
        {
            label: 'Descrição',
            value: company.description,
        },
    ]))
    
    return (
        <ListTemplate
            buttonName="+ Adicionar Empresa"
            handleButtonPath="/companies/create"
            data={data}
            sectionName="Empresas"
            values={values}
        />
    )
}

Companies.template = AdminTemplate

export default Companies