import { Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setSnackBarMessage } from "../../../../store/ducks/actions/main";

export const SnackBarAlert = ({
    message
}: {
    message: string;
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const duration = 3000
    useEffect(() => {
        if(message !== '') {
            setOpen(true)
            setTimeout(() => (setOpen(false), dispatch(setSnackBarMessage(''))), duration)
        }
    }, [message])
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onClose={() => setOpen(false)}
            message={message}
        />
    )
}