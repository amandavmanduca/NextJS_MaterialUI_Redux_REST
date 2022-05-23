import { Box } from "@mui/material";
import { useRouter } from "next/router";
import FullCompanyForm from "../../src/common/components/FullCompanyForm";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import { useCreateCompany } from "../../src/features/companies/hooks/useCreateCompany";

function CreateCompany() {
  const { create } = useCreateCompany();
  const router = useRouter();
  return (
    <Box style={{ display: 'grid' }}>
      <h1>Criação de Empresa</h1>
      <FullCompanyForm
        initialValues={{
          name: '',
          cnpj: '',
          description: '',
          responsibles: []
        }}
        onSubmit={async (values: any) => {
          const { responsibles, ...rest } = values
          const formatedResponsibles = responsibles?.map((r: any) => {
            const { id, ...rest } = r
            return { ...rest }
          })
          await create({
            ...rest,
            responsibles: formatedResponsibles
          }).then(() => router.push('/companies'))
        }}
      />
    </Box>
  );
}


CreateCompany.template = AdminTemplate

export default CreateCompany;
