import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Place } from "../../../common/types"
import { apiURL } from "../../../common/utils"


export const useGetPlaces = () => {
    const [data, setData] = useState<Place[]>()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    
    async function getPlaces() {
        try {
            const res = await axios.get(`${apiURL}/places`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
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