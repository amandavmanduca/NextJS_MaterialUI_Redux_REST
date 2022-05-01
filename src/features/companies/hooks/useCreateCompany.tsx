import axios from 'axios';
import { apiURL } from '../../../common/utils';

export const useCreateCompany = () => {
    async function create(values: any) {
        try {
            const res = await axios.post(`${apiURL}/companies`, values,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const company = await res.data
            return company
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return {
        create,
    }
}