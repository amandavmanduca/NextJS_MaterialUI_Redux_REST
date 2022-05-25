import { combineReducers } from '@reduxjs/toolkit'
import { snackbarMessages } from './main';
import { token } from './auth';

const rootReducer = combineReducers({
    auth: token.reducer,
    snackbar: snackbarMessages,
})

export default rootReducer;