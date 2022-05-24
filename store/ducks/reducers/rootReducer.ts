import { combineReducers } from '@reduxjs/toolkit'
import { snackbarMessages } from './main';
import { token, user } from './auth';

const rootReducer = combineReducers({
    auth: token.reducer,
    user: user.reducer,
    snackbar: snackbarMessages,
})

export default rootReducer;