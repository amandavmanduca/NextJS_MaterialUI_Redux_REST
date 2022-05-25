import { destroyCookie, setCookie } from 'nookies'
import { setLogoutTime } from '../helpers/handleLogoutTime'

export const cookies = (store: any) => (next: any) => (action: any) => {
    const result = next(action)
    const { meta } = action
    if (meta) {
        if (meta.cookie) {
            meta.cookie.token !== null ?
            setCookie(null, meta.cookie.key, meta.cookie.token, {
                maxAge: meta.cookie.session_duration_in_seconds,
                path: '/',
            })
            :
            destroyCookie(null, meta.cookie.key)
            if (meta.cookie.session_duration_in_seconds) {
                setLogoutTime(meta.cookie.session_duration_in_seconds)
            }
        }
        if (meta.user) {
            meta.user.id !== null ?
            setCookie(null, meta.user.key, meta.user.id, {
                maxAge: meta.cookie.session_duration_in_seconds,
                path: '/',
            })
            :
            destroyCookie(null, meta.user.key)
        }
    }
    return result
}