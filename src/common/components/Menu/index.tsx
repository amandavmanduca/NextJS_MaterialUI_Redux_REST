import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { menuRoutes } from './menuRoutes';

const Menu = () => {
    const router = useRouter()

    return (
        <Box
            sx={{ m: 1, bgcolor: 'secondary.light' }}
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                justifyContent: 'center',
                width: '100%',
        }}>
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
    )
}

export default Menu;