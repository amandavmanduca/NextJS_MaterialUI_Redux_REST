import axios from "axios"
import { apiURL } from "../utils"

export const getCompanyArray = async (): Promise<[{ value: string; label: string }]> => {
    const { data: response } = await axios.get(`${apiURL}/companies`)
    const arrayOptions = await response?.map((c: any) => ({
        value: c.id,
        label: c.name,
    }))
    return arrayOptions
}