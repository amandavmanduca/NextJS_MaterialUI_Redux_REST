import axios from 'axios';
import { apiURL } from '../../../common/utils';

export const useCreatePlace = () => {
    async function create(values: any) {
        try {
            const res = await axios.post(`${apiURL}/places`, values,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const place = await res.data
            return place
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