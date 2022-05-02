import FullPlaceForm from "../../src/common/components/FullPlaceForm";

export default function CreatePlace() {
  return (
    <FullPlaceForm
      initialValues={{
        name: '',
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
      onSubmit={(values: any) => {
        console.log("onSubmit", JSON.stringify(values, null, 2));
      }}
    />
  );
}
