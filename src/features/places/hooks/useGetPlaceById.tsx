import axios from "axios"
import { useState } from "react"
import { apiURL } from "../../../common/utils"


export const useGetPlaceById = () => {
    const [data, setData] = useState<any>()
    async function getPlace(id: string) {
        try {
            const res = await axios.get(`${apiURL}/places/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const place = await res.data
            setData(place)
        } catch (error: any) {
            console.log(error)
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