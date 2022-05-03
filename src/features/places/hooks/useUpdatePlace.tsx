import axios from 'axios';
import { apiURL } from '../../../common/utils';

export const useUpdatePlace = () => {
    async function update(id: string, values: any) {
        try {
            const res = await axios.patch(`${apiURL}/places/${id}`, values,
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
        update,
    }
}