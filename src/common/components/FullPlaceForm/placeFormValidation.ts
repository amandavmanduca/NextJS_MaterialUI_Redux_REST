import * as Yup from "yup";
import { addressFormValidation, responsibleFormValidation } from "../ResponsibleForm/responsibleFormValidation";

const baseSchema = {
    name: Yup.string().required('Campo Obrigatório').max(40, 'Máximo de 40 caracteres'),
    company: Yup.object().shape({
      id: Yup.string().required('Campo Obrigatório'),
    }),
    ...addressFormValidation,
    ...responsibleFormValidation
}

export const createValidationSchema = Yup.object().shape({
  ...baseSchema
});

export const updateValidationSchema = Yup.object().shape({
  ...baseSchema,
  attendant_userId: Yup.string().required('Campo Obrigatório'),
});