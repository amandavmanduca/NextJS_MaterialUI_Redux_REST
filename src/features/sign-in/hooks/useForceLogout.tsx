import { destroyCookie } from 'nookies';

const useForceLogout = () => {
    
    function logout() {
        console.log('me chamou')
        destroyCookie(null, 'ticket_user_token')
    }

    return {
        logout
    }
}

export default useForceLogout;