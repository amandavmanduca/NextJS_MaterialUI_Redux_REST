import { parseCookies } from 'nookies'

export function getCookie(key: string) {
    try {
        const value = parseCookies()?.[key]
        return value
    } catch (error) {
        return null
    }
}