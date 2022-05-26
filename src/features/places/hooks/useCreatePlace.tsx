import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/actions/main';
import { Place } from '../../../common/types';
import { apiURL } from '../../../common/utils';

export const useCreatePlace = () => {
    //@ts-ignore
    const userToken: string = useSelector(data => data?.auth.data.token)
    const dispatch = useDispatch()
    async function create(values: Place) {
        try {
            const res = await axios.post(`${apiURL}/places`, values,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            const place = await res.data
            dispatch(setSnackBarMessage("Local atualizado com sucesso"));
            return place
        } catch (error: any) {
            console.log(error)
            dispatch(setSnackBarMessage("Erro ao atualizar local"));
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return {
        create,
    }
}