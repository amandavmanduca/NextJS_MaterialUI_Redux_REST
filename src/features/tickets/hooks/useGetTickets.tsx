import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { apiURL } from "../../../common/utils"


export const useGetTickets = () => {
    const [data, setData] = useState<any>()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    
    async function getTickets() {
        try {
            const res = await axios.get(`${apiURL}/tickets`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                }
            })
            const ticket = await res.data
            setData(ticket)
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }


    return {
        getTickets,
        data
    }
}