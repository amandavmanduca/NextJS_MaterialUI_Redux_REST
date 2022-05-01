import Axios from 'axios';
import { useState } from 'react';
import { apiURL } from '../../../common/utils';

export const useListCompanies = () => {
    const [data, setData] = useState([])

    async function listCompanies() {
        try {
            const { data: response } = await Axios.get(`${apiURL}/companies`);
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