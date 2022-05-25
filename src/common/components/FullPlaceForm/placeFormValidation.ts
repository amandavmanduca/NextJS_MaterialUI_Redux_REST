import * as Yup from "yup";
import { addressFormValidation, responsibleFormValidation } from "../ResponsibleForm/responsibleFormValidation";

const baseSchema = {
    name: Yup.string().required('Campo Obrigatório'),
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