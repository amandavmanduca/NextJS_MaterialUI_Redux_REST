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

const companyData = (state = {
    id: null,
    name: null,
    cnpj: null,
    description: null,
    responsibles: [],
}, action: any) => {
    switch(action.type) {
        case t.COMPANY_DATA:
            return {
                ...action.payload,
                responsibles: [...state.responsibles],
            };
        case t.ADD_RESPONSIBLE:
            return {
                ...state,
                responsibles: [...state.responsibles, { ...action.payload.responsible }]
            };
        case t.REMOVE_RESPONSIBLE:
            const filteredResponsible = state.responsibles?.filter((r: any) => r.name != action.payload.responsible.name)
            return {
                ...state,
                responsibles: [...filteredResponsible]
            };
        default:
            return { ... state }
    }
};

const placeReducer = (state = {
    name: '',
    company: {
      id: '',
    },
    address: {
        cep: '',
        state: '',
        city: '',
        street: '',
        neighborhood: '',
        number: '',
        complement: '',
    },
    responsibles: []
  }, action: any) => {
    switch(action.type) {
        case t.CREATE_PLACE:
            
    }
}

export {
    main,
    loggedUser,
    companyData,
    placeReducer,
};