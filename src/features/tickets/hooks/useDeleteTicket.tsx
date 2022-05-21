import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/ducks/actions/main';
import { apiURL } from '../../../common/utils';

export const useDeleteTicket = () => {
    const dispatch = useDispatch()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    async function deleteOne(id: string) {
        try {
            await axios.delete(`${apiURL}/tickets/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            dispatch(setSnackBarMessage("Ticket removido com sucesso"));
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data)
                dispatch(setSnackBarMessage("Erro ao remover ticket"));
            }
        }
    }

    return {
        deleteOne,
    }
}