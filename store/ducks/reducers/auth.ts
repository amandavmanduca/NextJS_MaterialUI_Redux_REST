import { useGetUserById } from "../../../src/features/sign-in/hooks/getUserById";
import { useLogin } from "../../../src/features/sign-in/hooks/useLogin";
import createAsyncSlice from "../helpers/createAsyncSlice";
import { getCookie } from "../helpers/getCookie";

const { login } = useLogin()
const { getUser } = useGetUserById()

const foundToken = getCookie('token')
const foundUserId = getCookie('user')

const token = createAsyncSlice({
    name: 'login',
    initialState: {
        data: {
            token: foundToken,
        },
    },
    reducers: {
        fetchSuccess: {
            reducer(state: any, action: any) {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            },
            prepare(payload: any) {
                return {
                    payload,
                    meta: {
                        cookie: {
                            key: 'token',
                            token: payload.token,
                            session_duration_in_seconds: payload.session_duration_in_seconds,
                        },
                        user: {
                            key: 'user',
                            id: payload.user.id,
                            session_duration_in_seconds: payload.session_duration_in_seconds,
                        },
                    }
                }
            }
        },
        fetchError: {
            reducer(state: any) {
                state.loading = false;
                state.data = state.data,
                state.error = 'Erro ao realizar login'
            }
        },
        fetchLogout: {
            reducer(state: any) {
                state.loading = false;
                state.data = {
                    token: null,
                    session_duration_in_seconds: null,
                    user: null
                };
                state.error = null;
            },
            prepare() {
                return {
                    meta: {
                        cookie: {
                            key: 'token',
                            token: null,
                            session_duration_in_seconds: null,
                        },
                        user: {
                            key: 'user',
                            id: null,
                            session_duration_in_seconds: null,
                        },
                    }
                }
            }
        },
    },
    fetchConfig: (user: { username: string, password: string }) => login({ username: user.username, password: user.password })
})


const user = createAsyncSlice({
    name: 'user',
    initialState: {
        data: {
            id: foundUserId,
        },
    },
    fetchConfig: (id: string) => getUser(id)
})


export const fetchToken = token.asyncAction;
export const fetchUser = user.asyncAction;
export const fetchLogout: any = token.actions.fetchLogout


export const autoLogin = (id: string) => async (dispatch: any) => {
    if (id) {
        await dispatch(fetchUser(id))
    }
}

export {
    token,
    user
}