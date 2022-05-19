import { destroyCookie } from 'nookies';
import { logoutHook } from '../../../../store/ducks/actions/main';

const useForceLogout = () => {
    
    function logout() {
        console.log('me chamou')
        destroyCookie(null, 'ticket_user_token')
        logoutHook()
    }

    return {
        logout
    }
}

export default useForceLogout;