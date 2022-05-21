import { combineReducers } from '@reduxjs/toolkit'
import { main, loggedUser, companyData, snackbarMessages } from './main';
import { token, user } from './auth';

const rootReducer = combineReducers({
    main: main,
    loggedUser: loggedUser,
    companyData: companyData,
    auth: token.reducer,
    user: user.reducer,
    snackbar: snackbarMessages,
})

export default rootReducer;