import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/actions/main';
import { apiURL } from '../../../common/utils';

export const useUpdateCompany = () => {
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    const dispatch = useDispatch()
    async function update(id: string, values: any) {
        try {
            const res = await axios.patch(`${apiURL}/companies/${id}`, values,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            const response = await res.data
            dispatch(setSnackBarMessage("Empresa atualizada com sucesso"));
            return response
        } catch (error: any) {
            console.log(error)
            dispatch(setSnackBarMessage("Erro ao atualizar empresa"));
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return {
        update,
    }
}