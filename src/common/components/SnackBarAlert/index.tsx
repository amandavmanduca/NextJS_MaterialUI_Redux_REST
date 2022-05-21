import { Snackbar } from "@mui/material"
import { useEffect, useState } from "react"

export const SnackBarAlert = ({
    message
}: {
    message: string;
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const duration = 3000
    useEffect(() => {
        if(message) {
            setOpen(true)
            setTimeout(() => setOpen(false), duration)
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