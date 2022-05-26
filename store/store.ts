import rootReducer from "./reducers/rootReducer"
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit'
import { cookies } from './middlewares/logger';

const middleware = [...getDefaultMiddleware(), cookies]

const reducer = rootReducer;

export const store = configureStore({ reducer, middleware })

