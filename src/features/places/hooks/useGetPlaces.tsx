import axios from "axios"
import { useState } from "react"
import { apiURL } from "../../../common/utils"


export const useGetPlaces = () => {
    const [data, setData] = useState<any>()
    
    async function getPlaces() {
        try {
            const res = await axios.get(`${apiURL}/places`,
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
        getPlaces,
        data
    }
}