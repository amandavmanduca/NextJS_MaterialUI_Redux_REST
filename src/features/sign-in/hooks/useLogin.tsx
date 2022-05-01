import axios from 'axios';
import { useState } from 'react';
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
        login,
    }
}