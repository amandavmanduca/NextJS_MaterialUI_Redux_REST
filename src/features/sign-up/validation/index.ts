import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Campo Obrigatório').min(6, 'Mínimo 6 caracteres'),
    email: Yup.string().email('Deve ser um e-mail válido').required('Campo Obrigatório'),
    password: Yup.string().required('Campo Obrigatório').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Deve possuir 6 caracteres, pelo menos uma letra maíscula, uma minúscula, um número e um caracter especial"
    ).max(10, 'Máximo 10 caracteres'),
});