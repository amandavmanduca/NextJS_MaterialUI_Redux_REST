import { useEffect, useState } from "react";
import FullCompanyForm from "../../../src/common/components/FullCompanyForm";
import AdminTemplate from "../../../src/common/templates/AdminTemplate";
import { useGetCompanyById } from "../../../src/features/companies/hooks/useGetCompanyById";
import { useUpdateCompany } from "../../../src/features/companies/hooks/useUpdateCompany";


const UpdateCompany = ({ slug }: any) => {
    const { getCompany, data } = useGetCompanyById()
    const { update } = useUpdateCompany()
    const [initialValues, setInitialValues] = useState<any>(null)

    useEffect(() => {
        if (slug) {
            getCompany(slug)
        }
    }, [])

    useEffect(() => {
        if(data) {
            setInitialValues(data)
        }
    }, [data])

    return (
        initialValues &&
        <FullCompanyForm
            initialValues={initialValues}
            onSubmit={async (values: any) => {
            const { responsibles, ...rest } = values
            const formatedResponsibles = responsibles?.map((r: any) => {
                const { id, ...rest } = r
                if (String(id)?.includes('.')) {
                    return { ... rest }
                } else {
                    return { ...r }
                }
            })
            await update(slug, {
                ...rest,
                responsibles: formatedResponsibles
            })
        }}
      />
    )
}

UpdateCompany.template = AdminTemplate

export default UpdateCompany;

UpdateCompany.getInitialProps = ({ query: { slug } }: any) => {
    return { slug };
};