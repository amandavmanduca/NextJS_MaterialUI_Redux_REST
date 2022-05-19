import { createSlice } from "@reduxjs/toolkit"


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
            return dispatch(fetchSuccess(response))
        } catch (error) {
            return dispatch(fetchError(error))
        }
    }
    return { ...slice, asyncAction }
}

export default createAsyncSlice;