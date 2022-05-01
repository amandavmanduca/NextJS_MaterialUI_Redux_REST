import axios from "axios"

export const searchCep = async (cep: string) => {
    const data = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return await data?.data
}