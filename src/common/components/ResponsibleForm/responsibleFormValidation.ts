import * as Yup from "yup";

export const addressFormValidation = {
  address: Yup.object().shape({
    cep: Yup.string().length(8, 'Deve ter 08 caracteres').required('Campo Obrigatório'),
    state: Yup.string().required('Campo Obrigatório'),
    city: Yup.string().required('Campo Obrigatório'),
    neighborhood: Yup.string().required('Campo Obrigatório'),
    street: Yup.string().required('Campo Obrigatório'),
    number: Yup.string().required('Campo Obrigatório'),
    complement: Yup.string().nullable(),
  }),
}

export const responsibleFormValidation = {
  responsibles: Yup.array().nullable().of(
    Yup.object().shape({
      name: Yup.string().required('Campo Obrigatório'),
      telephone: Yup.string().required('Campo Obrigatório'),
      isPlaceMainResponsible: Yup.boolean(),
      ...addressFormValidation,
    })
  )
}