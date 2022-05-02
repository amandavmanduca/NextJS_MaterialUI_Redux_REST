import { combineReducers  } from "redux";
import { main, loggedUser, companyData } from './main';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
    main: main,
    loggedUser: loggedUser,
    companyData: companyData,
    form: reduxFormReducer
})

export default rootReducer;