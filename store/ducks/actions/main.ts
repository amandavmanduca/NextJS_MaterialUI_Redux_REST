import * as t from '../types';

export const setInfo = (name: string) => ({
    type: t.SET_NAME,
    payload: name
});

export const userLogin = ({
    name,
    email,
    token,
    session_duration_in_seconds,
}: {
    name: string;
    email: string;
    token: string;
    session_duration_in_seconds: number
}) => ({
    type: t.USER_LOGIN,
    payload: {
        name: name,
        email: email,
        token: token,
        session_duration_in_seconds: session_duration_in_seconds,
    }
});