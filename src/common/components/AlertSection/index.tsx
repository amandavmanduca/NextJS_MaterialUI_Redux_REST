import { useSelector } from "react-redux";
import { SnackBarAlert } from "../SnackBarAlert";

const AlertSection = ({
    children
}: any) => {
    const message: any = useSelector((data: any) => data?.snackbar?.message)
    return (
        <>
            {children}
            <SnackBarAlert message={message} />
        </>
    )
}

export default AlertSection;