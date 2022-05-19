import { setCookie } from 'nookies'

export const cookies = (store: any) => (next: any) => (action: any) => {
    const result = next(action)
    const { meta } = action
    if (meta) {
        if(meta.cookie) {
            setCookie(null, meta.cookie.key, meta.cookie.token, {
                maxAge: meta.cookie.session_duration_in_seconds,
                path: '/',
            })
        }
        if (meta.user) {
            setCookie(null, meta.user.key, meta.user.id, {
                maxAge: meta.cookie.session_duration_in_seconds,
                path: '/',
            })
        }
    }
    return result
}