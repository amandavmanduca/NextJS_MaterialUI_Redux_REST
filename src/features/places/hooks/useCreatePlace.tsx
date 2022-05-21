import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSnackBarMessage } from '../../../../store/ducks/actions/main';
import { apiURL } from '../../../common/utils';

export const useCreatePlace = () => {
    //@ts-ignore
    const userToken = useSelector(data => data?.auth.data.token)
    const dispatch = useDispatch()
    async function create(values: any) {
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