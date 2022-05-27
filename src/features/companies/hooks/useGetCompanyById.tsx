import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { apiURL } from "../../../common/utils"


export const useGetCompanyById = () => {
    const [data, setData] = useState<any>()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    async function getCompany(id: string) {
        try {
            const res = await axios.get(`${apiURL}/companies/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            const company = await res.data
            setData(company)
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }
    return {
        getCompany,
        data,
    }
}