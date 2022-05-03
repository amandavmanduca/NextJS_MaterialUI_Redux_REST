import FullPlaceForm from "../../src/common/components/FullPlaceForm";
import { useCreatePlace } from "../../src/features/places/hooks/useCreatePlace";

export default function CreatePlace() {
  const { create } = useCreatePlace();
  return (
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
        })
      }}
    />
  );
}
