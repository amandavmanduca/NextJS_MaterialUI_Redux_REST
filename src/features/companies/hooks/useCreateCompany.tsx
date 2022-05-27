import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/actions/main';
import { apiURL } from '../../../common/utils';

export const useCreateCompany = () => {
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    const dispatch = useDispatch()
    async function create(values: any) {
        try {
            const res = await axios.post(`${apiURL}/companies`, values,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            const company = await res.data
            dispatch(setSnackBarMessage("Empresa criada com sucesso"));
            return company
        } catch (error: any) {
            dispatch(setSnackBarMessage("Erro ao criar empresa"));
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return {
        create,
    }
}