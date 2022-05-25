import { destroyCookie, setCookie } from "nookies";
import { useDispatch } from "react-redux";
import { setSnackBarMessage } from "../actions/main";
import { getCookie } from "./getCookie";


export function setLogoutTime(duration: string) {
    const durationInMiliSeconds = Number(duration) * 1000;
    const now = new Date().getTime();
    const logoutTime = now + durationInMiliSeconds
    setCookie(null, 'logout_time', String(logoutTime), {
        maxAge: duration,
        path: '/',
    })
    handleLogout()
}

export function handleLogout() {
    const now = new Date().getTime();
    const logoutTime = Number(getCookie('logout_time'))
    if (logoutTime) {
        const timeToLogout = logoutTime - now
        setTimeout(() => {
            destroyCookie(null, 'logout_time');
            window.location.replace('/sign-in')
        }, timeToLogout);
    }
}