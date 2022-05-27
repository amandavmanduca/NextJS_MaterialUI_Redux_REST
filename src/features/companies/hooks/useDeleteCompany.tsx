import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/actions/main';
import { apiURL } from '../../../common/utils';

export const useDeleteCompany = () => {
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    const dispatch = useDispatch()
    async function deleteOne(id: string) {
        try {
            await axios.delete(`${apiURL}/companies/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            dispatch(setSnackBarMessage("Empresa removida com sucesso"));
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(setSnackBarMessage("Erro ao remover empresa"));
            }
        }
    }

    return {
        deleteOne,
    }
}