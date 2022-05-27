import { useEffect, useState } from "react";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import ListTemplate from "../../src/common/templates/ListTemplate";
import { Company, ListTemplateItem } from "../../src/common/types";
import { useDeleteCompany } from "../../src/features/companies/hooks/useDeleteCompany";
import { useListCompanies } from "../../src/features/companies/hooks/useListCompanies";

const Companies = (): React.ReactNode => {
    const { data, listCompanies } = useListCompanies();
    const { deleteOne } = useDeleteCompany()
    const [values, setValues] = useState<Array<ListTemplateItem[]> | []>([])

    useEffect(() => {
        listCompanies()
    }, [])

    useEffect(() => {
        if (data) {
            const items: Array<ListTemplateItem[]> = data?.map((company: Company) => ([
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
            setValues(items)
        }
    }, [data])

    return (
        <ListTemplate
            buttonName="+ Adicionar Empresa"
            handleButtonPath="/companies/create"
            handleEditPath="/companies/"
            sectionName="Empresas"
            values={values}
            handleDeleteOne={deleteOne}
            refetch={listCompanies}
        />
    )
}

Companies.template = AdminTemplate

export default Companies