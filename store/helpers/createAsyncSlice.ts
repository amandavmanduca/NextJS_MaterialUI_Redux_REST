import { createSlice } from "@reduxjs/toolkit"
import { setSnackBarMessage } from "../actions/main";


const createAsyncSlice = (config: {
    name: string;
    initialState?: any;
    reducers?: any;
    fetchConfig: any;
}) => {
    const slice = createSlice({
        name: config.name,
        initialState: {
            loading: false,
            data: null,
            error: null,
            ...config.initialState,
        },
        reducers: {
            fetchStarted(state: any) {
                state.loading = true;
            },
            fetchSuccess(state: any, action: any) {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            },
            fetchError(state: any, action: any) {
                state.loading = false;
                state.data = {
                    token: null,
                    session_duration_in_seconds: null,
                    user: null
                };
            },
            ...config.reducers,
        },
    });

    const { fetchStarted, fetchSuccess, fetchError }: any = slice.actions;

    const asyncAction: any = (payload: any) => async (dispatch: any) => {
        try {
            dispatch(fetchStarted())
            const response = await config.fetchConfig(payload) 
            dispatch(setSnackBarMessage(`Bem vindo ${response.user.name}`))
            window.location.replace('/companies')
            return dispatch(fetchSuccess(response))
        } catch (error) {
            dispatch(setSnackBarMessage('Erro ao realizar login'))
            return dispatch(fetchError(error))
        }
    }
    return { ...slice, asyncAction }
}

export default createAsyncSlice;