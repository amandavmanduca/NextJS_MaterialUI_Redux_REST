import { useEffect, useState } from "react";
import { getCookie } from "../../../../store/helpers/getCookie";
import Menu from "../../components/Menu";

const AdminTemplate = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    useEffect(() => {
        const token = getCookie('token')
        if(token) {
            setIsAuth(true)
        }
    }, [])

    if (!isAuth) return <></>

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                width: '100%',
                height: '100%',
                minHeight: '100vh',
                gap: '20px',
                justifyContent: 'flex-start',
            }}>
            <Menu />
            <div style={{ marginBottom: '50px' }}>
                {children}
            </div>
        </div>
    )
}

export default AdminTemplate;