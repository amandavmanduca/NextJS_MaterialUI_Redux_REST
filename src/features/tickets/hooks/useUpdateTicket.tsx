import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/actions/main';
import { apiURL } from '../../../common/utils';

export const useUpdateTicket = () => {
    const dispatch = useDispatch()
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    async function update(id: string, values: any) {
        try {
            const res = await axios.patch(`${apiURL}/tickets/${id}`, values,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            const ticket = await res.data
            dispatch(setSnackBarMessage("Ticket atualizado com sucesso"));
            return ticket
        } catch (error: any) {
            console.log(error)
            dispatch(setSnackBarMessage("Erro ao atualizar ticket"));
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return {
        update,
    }
}