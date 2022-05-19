import { combineReducers } from '@reduxjs/toolkit'
import { main, loggedUser, companyData } from './main';
import { token, user } from './auth';

const rootReducer = combineReducers({
    main: main,
    loggedUser: loggedUser,
    companyData: companyData,
    auth: token.reducer,
    user: user.reducer,
})

export default rootReducer;