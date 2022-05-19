import Axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiURL } from '../../../common/utils';

export const useListCompanies = () => {
    const [data, setData] = useState([])
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)

    async function listCompanies() {
        try {
            const { data: response } = await Axios.get(`${apiURL}/companies`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setData(response)
        } catch (error: any) {
            console.error(error);
        }
    }

    return {
        listCompanies,
        data
    }
}