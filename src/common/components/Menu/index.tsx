import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../../../store/ducks/reducers/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { menuRoutes } from './menuRoutes';

const Menu = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    return (
        <Box
            sx={{ ml: 2, bgcolor: 'secondary.light' }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
            }}
        >
            <Box
                style={{
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                {menuRoutes?.map(route => (
                    <Box
                        key={route.path}
                        sx={{ m: 1, color: router.pathname.includes(route.path) ? 'primary.main' : 'black' }}
                        onClick={() => router.push(`${route.path}`)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '2px solid white',
                            padding: '20px 0px',
                            cursor: 'pointer',
                        }}>
                        <p>{route.name}</p>
                        <route.icon />
                    </Box>
                ))}
            </Box>
            <Box
                // @ts-ignore
                onClick={() => dispatch(fetchLogout(), router.push('/sign-in'))}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
            >
                <LogoutIcon />
                <p>Sair</p>
            </Box>
            
        </Box>
    )
}

export default Menu;