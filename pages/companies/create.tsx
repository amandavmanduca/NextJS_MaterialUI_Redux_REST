import { Box } from "@mui/material";
import FullCompanyForm from "../../src/common/components/FullCompanyForm";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import { useCreateCompany } from "../../src/features/companies/hooks/useCreateCompany";

function CreateCompany() {
  const { create } = useCreateCompany();
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
          })
        }}
      />
    </Box>
  );
}


CreateCompany.template = AdminTemplate

export default CreateCompany;
