import axios from 'axios';
import { AuthUser } from '../../../common/types';
import { apiURL } from '../../../common/utils';

export const useLogin = () => {
    async function login(values: {
        username: string;
        password: string;
    }) {
        try {
            const res = await axios.post(`${apiURL}/auth/login`, values,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const user: AuthUser = await res.data
            return user
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return {
        login,
    }
}