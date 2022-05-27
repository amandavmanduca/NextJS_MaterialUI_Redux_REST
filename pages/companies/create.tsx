import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import FullCompanyForm from "../../src/common/components/FullCompanyForm";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import FormAreaTemplate from "../../src/common/templates/FormAreaTemplate";
import { Company, Responsible } from "../../src/common/types";
import { useCreateCompany } from "../../src/features/companies/hooks/useCreateCompany";

function CreateCompany() {
  const { create } = useCreateCompany();
  const router = useRouter();
  return (
    <FormAreaTemplate>
      <Typography component="h1" variant="h5" marginBottom="20px">
        Nova Empresa
      </Typography>
      <FullCompanyForm
        initialValues={{
          name: '',
          cnpj: '',
          description: '',
          responsibles: []
        }}
        onSubmit={async (values: Company) => {
          const { responsibles, ...rest } = values
          const formatedResponsibles = responsibles?.map((r: Responsible) => {
            const { id, ...rest } = r
            return { ...rest }
          })
          await create({
            ...rest,
            responsibles: formatedResponsibles
          }).then(() => router.push('/companies'))
        }}
      />
    </FormAreaTemplate>
  );
}


CreateCompany.template = AdminTemplate

export default CreateCompany;
