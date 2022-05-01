import axios from 'axios';
import { apiURL } from '../../../common/utils';

export const useCreateUser = () => {
    async function create(values: {
        name: string;
        email: string;
        password: string;
    }) {
        try {
            const res = await axios.post(`${apiURL}/users`, values,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const user = await res.data
            return user
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