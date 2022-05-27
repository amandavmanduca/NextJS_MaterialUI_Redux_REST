import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { apiURL } from "../../../common/utils"


export const useGetPlaceById = () => {
    const [data, setData] = useState<any>()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    async function getPlace(id: string) {
        try {
            const res = await axios.get(`${apiURL}/places/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            const place = await res.data
            setData(place)
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }
    return {
        getPlace,
        data,
    }
}