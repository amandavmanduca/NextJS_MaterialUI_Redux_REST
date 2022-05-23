import { Box } from "@mui/material";
import { useRouter } from "next/router";
import FullPlaceForm from "../../src/common/components/FullPlaceForm";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import { useCreatePlace } from "../../src/features/places/hooks/useCreatePlace";

function CreatePlace() {
  const { create } = useCreatePlace();
  const router = useRouter();
  return (
    <Box style={{ display: 'grid' }}>
      <h1>Criação de Local</h1>
      <FullPlaceForm
        initialValues={{
          name: '',
          company: {
            id: '',
          },
          address: {
              cep: '',
              state: '',
              city: '',
              street: '',
              neighborhood: '',
              number: '',
              complement: '',
          },
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
          }).then(() => router.push('/places'))
        }}
      />
    </Box>
  );
}


CreatePlace.template = AdminTemplate

export default CreatePlace;
