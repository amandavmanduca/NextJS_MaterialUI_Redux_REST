import * as Yup from "yup";
import { responsibleFormValidation } from "../ResponsibleForm/responsibleFormValidation";

export const baseSchema = Yup.object().shape({
    name: Yup.string().required('Campo Obrigatório').max(40, 'Máximo de 40 caracteres'),
    cnpj: Yup.string().length(14, 'Deve possuir 14 caracteres').matches(/^[0-9]+$/, "Deve possui apenas números").required('Campo Obrigatório'),
    description: Yup.string().required('Campo Obrigatório').max(120, 'Máximo de 120 caracteres'),
    ...responsibleFormValidation
});