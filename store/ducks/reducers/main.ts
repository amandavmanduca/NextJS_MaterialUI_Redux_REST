import * as t from '../types';

const main = (state = {
    name: "guest"
}, action: any) => {
    switch(action.type) {
        case t.SET_NAME:
            return { ... state, userInfo: {
                name: action.payload
            }};
        default:
            return { ... state }
    }
};

const loggedUser = (state = {
    name: null,
    email: null,
    token: null,
    session_duration_in_seconds: 0,
}, action: any) => {
    switch(action.type) {
        case t.USER_LOGIN:
            return { ...action.payload };
        default:
            return { ... state }
    }
};

export {
    main,
    loggedUser
};