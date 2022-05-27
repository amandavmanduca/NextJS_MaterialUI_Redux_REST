import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { apiURL } from "../../../common/utils"


export const useGetTicketById = () => {
    const [data, setData] = useState<any>()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    async function getTicket(id: string) {
        try {
            const res = await axios.get(`${apiURL}/tickets/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            const item = await res.data
            setData(item)
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }
    return {
        getTicket,
        data,
    }
}