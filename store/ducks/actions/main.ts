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


export const setCompanyData = (values: any) => ({
    type: t.COMPANY_DATA,
    payload: {
        id: values.id,
        name: values.name,
        cnpj: values.cnpj,
        description: values.description,
        responsibles: values.responsibles,
    }
});

export const addResponsibleToCompany = (values: any) => ({
    type: t.ADD_RESPONSIBLE,
    payload: {
        responsible: values,
    }
});

export const removeResponsibleFromCompany = (values: any) => ({
    type: t.REMOVE_RESPONSIBLE,
    payload: {
        responsible: values,
    }
});

export const createOnePlace = (values: any) => ({
    type: t.CREATE_PLACE,
    payload: {
        place: values,
    }
})
