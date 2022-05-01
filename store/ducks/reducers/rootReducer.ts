import { combineReducers  } from "redux";
import { main, loggedUser } from './main';

const rootReducer = combineReducers({
    main: main,
    loggedUser: loggedUser,
})

export default rootReducer;