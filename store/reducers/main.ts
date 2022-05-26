import * as t from '../types';

const snackbarMessages = (state = {
    message: ''
}, action: any) => {
    switch(action.type) {
        case t.SNACKBAR:
            return {
                message: action.payload
            }
        default:
            return { ... state }
    }
};


export {
    snackbarMessages,
};
