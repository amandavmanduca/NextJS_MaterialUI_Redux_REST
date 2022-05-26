import * as t from '../types';

export const setSnackBarMessage = (message?: string) => ({
    type: t.SNACKBAR,
    payload: message,
})
