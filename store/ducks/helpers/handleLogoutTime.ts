import { setCookie } from "nookies";
import { getCookie } from "./getCookie";


export function setLogoutTime(duration: string) {
    console.log('duration ', duration)
    const durationInMiliSeconds = Number(duration) * 1000;
    const now = new Date().getTime();
    const logoutTime = now + durationInMiliSeconds
    setCookie(null, 'logout_time', String(logoutTime), {
        maxAge: duration,
        path: '/',
    })
    handleAutoLogout()
}

export function handleAutoLogout() {
    const now = new Date().getTime();
    const logoutTime = Number(getCookie('logout_time'))
    if (logoutTime) {
        const timeToLogout = logoutTime - now
        setTimeout(() => {
            if (!getCookie('logout_time')) {
                window.location.replace('/sign-in')
            }
        }, timeToLogout);
    }
}