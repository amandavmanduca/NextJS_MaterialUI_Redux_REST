import axios from "axios"
import { useSelector } from "react-redux"
import { apiURL } from "../../../common/utils"


export const useGetUserById = () => {
    async function getUser(id: string) {
        //@ts-ignore
        const userToken = useSelector(data => data?.auth?.data?.token)
        try {
            const res = await axios.get(`${apiURL}/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            const user = await res.data
            return user
        } catch (error: any) {
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