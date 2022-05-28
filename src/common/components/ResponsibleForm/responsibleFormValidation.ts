import * as Yup from "yup";

export const addressFormValidation = {
  address: Yup.object().shape({
    cep: Yup.string().length(8, 'Deve ter 08 caracteres').matches(/^[0-9]+$/, "Deve possui apenas números").required('Campo Obrigatório'),
    state: Yup.string().required('Campo Obrigatório'),
    city: Yup.string().required('Campo Obrigatório'),
    neighborhood: Yup.string().required('Campo Obrigatório'),
    street: Yup.string().required('Campo Obrigatório'),
    number: Yup.string().required('Campo Obrigatório').max(15, 'Máximo de 15 caracteres'),
    complement: Yup.string().nullable().notRequired().max(30, 'Máximo de 30 caracteres'),
  }),
}

export const responsibleFormValidation = {
  responsibles: Yup.array().nullable().of(
    Yup.object().shape({
      name: Yup.string().required('Campo Obrigatório').max(40, 'Máximo de 40 caracteres'),
      telephone: Yup.string().matches(/^[0-9]+$/, "Deve possui apenas números").min(10, 'Mínimo de 10 caracteres').max(11, 'Máximo de 11 caracteres').required('Campo Obrigatório'),
      isPlaceMainResponsible: Yup.boolean().notRequired(),
      ...addressFormValidation,
    })
  ).test(function (array) {
    const available = array?.filter((responsible) => responsible.isPlaceMainResponsible === true)
    if (available && available?.length > 1) {
      return this.createError({ message: 'Somente um responsável deve ser o principal', path: 'uniqueMainResponsible' })
    }
    return true
  })
}