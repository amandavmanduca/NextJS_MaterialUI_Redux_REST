import { useSelector } from "react-redux";
import { SnackBarAlert } from "../SnackBarAlert";

const AlertSection = ({
    children
}: {
    children: React.ReactNode
}) => {
    const message: string = useSelector((data: any) => data?.snackbar?.message)
    return (
        <>
            {children}
            <SnackBarAlert message={message} />
        </>
    )
}

export default AlertSection;