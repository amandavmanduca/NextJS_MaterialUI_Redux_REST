import axios from "axios"
import { apiURL } from "../../../common/utils"


export const useGetUserById = () => {
    async function getUser(id: string) {
        try {
            const res = await axios.get(`${apiURL}/users/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const user = await res.data
            return user
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
                return error.response.data
            }
        }
    }
    return {
        getUser,
    }
}