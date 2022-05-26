import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/actions/main';
import { apiURL } from '../../../common/utils';

export const useDeletePlace = () => {
    const dispatch = useDispatch()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    async function deleteOne(id: string) {
        try {
            await axios.delete(`${apiURL}/places/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            dispatch(setSnackBarMessage("Local removido com sucesso"));
        } catch (error: any) {
            dispatch(setSnackBarMessage("Erro ao remover local"));
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return {
        deleteOne,
    }
}