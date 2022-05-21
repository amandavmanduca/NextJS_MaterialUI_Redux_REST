import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/ducks/actions/main';
import { apiURL } from '../../../common/utils';

export const useUpdatePlace = () => {
    const dispatch = useDispatch()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    async function update(id: string, values: any) {
        try {
            const res = await axios.patch(`${apiURL}/places/${id}`, values,
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
        update,
    }
}