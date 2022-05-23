import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { apiURL } from "../../../common/utils"


export const useGetUsers = () => {
    const [data, setData] = useState<any>()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    
    async function getUsers() {
        try {
            const res = await axios.get(`${apiURL}/users`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                }
            })
            const items = await res.data
            setData(items)
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }


    return {
        getUsers,
        data
    }
}