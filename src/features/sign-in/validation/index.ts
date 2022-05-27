import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    username: Yup.string().email('Deve ser um e-mail válido').required('Campo Obrigatório'),
    password: Yup.string().required('Campo Obrigatório').min(6, 'Mínimo 6 caracteres'),
});
