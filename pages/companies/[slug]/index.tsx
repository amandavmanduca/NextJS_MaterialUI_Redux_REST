import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullCompanyForm from "../../../src/common/components/FullCompanyForm";
import AdminTemplate from "../../../src/common/templates/AdminTemplate";
import { Company, Responsible, SlugInitialProps } from "../../../src/common/types";
import { useGetCompanyById } from "../../../src/features/companies/hooks/useGetCompanyById";
import { useUpdateCompany } from "../../../src/features/companies/hooks/useUpdateCompany";


const UpdateCompany = ({ slug }: { slug: string }) => {
    const { getCompany, data } = useGetCompanyById()
    const { update } = useUpdateCompany()
    const router = useRouter()
    const [initialValues, setInitialValues] = useState<Company | null>(null)

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
            onSubmit={async (values: Company) => {
            const { responsibles, ...rest } = values
            const formatedResponsibles = responsibles?.map((r: Responsible) => {
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
            }).then(() => router.push('/companies'))
        }}
      />
    )
}

UpdateCompany.template = AdminTemplate

export default UpdateCompany;

UpdateCompany.getInitialProps = ({ query: { slug } }: SlugInitialProps) => {
    return { slug };
};