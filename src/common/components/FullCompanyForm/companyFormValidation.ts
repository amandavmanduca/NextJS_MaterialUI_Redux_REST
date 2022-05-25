import * as Yup from "yup";
import { responsibleFormValidation } from "../ResponsibleForm/responsibleFormValidation";

export const baseSchema = Yup.object().shape({
    name: Yup.string().required('Campo Obrigatório'),
    cnpj: Yup.string().length(14, 'Deve possuir 14 caracteres').required('Campo Obrigatório'),
    description: Yup.string().required('Campo Obrigatório'),
    ...responsibleFormValidation
});
