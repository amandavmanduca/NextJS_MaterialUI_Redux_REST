import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../store/ducks/store';
import { getCookie } from '../store/ducks/helpers/getCookie'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackBarAlert } from '../src/common/components/SnackBarAlert';
import AlertSection from '../src/common/components/AlertSection';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  const token = getCookie('token')
  const router = useRouter()
  useEffect(() => {
    if (router.pathname !== '/sign-in' && router.pathname !== '/sign-up') {
      if (!token) {
        router.push('/sign-in')
      }
    }
  }, [token])

  useEffect(() => {
    if (router.pathname === '/') {
      if (!token) {
        router.push('/sign-in')
      } else {
        router.push('/companies')
      }
    }
  }, [])

  //@ts-ignore
  const Template = Component?.template || EmptyTemplate

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <Template>
            <AlertSection>
              <Component {...pageProps} />
            </AlertSection>
          </Template>
        </SessionProvider>
    </ThemeProvider>
    </Provider>
  )
}

const EmptyTemplate = ({ children }: { children: React.ReactNode}) => <>{children}</>



export default MyApp;