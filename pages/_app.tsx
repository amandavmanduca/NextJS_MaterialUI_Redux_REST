import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store/store';
import { getCookie } from '../store/helpers/getCookie'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AlertSection from '../src/common/components/AlertSection';
import { handleAutoLogout } from '../store/helpers/handleLogoutTime';

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

  const [handlingAutoLogout, setHandlingAutoLogout] = useState<boolean>(false);

  useEffect(() => {
    if(!handlingAutoLogout) {
      setHandlingAutoLogout(true)
      handleAutoLogout()
      setHandlingAutoLogout(false)
    }
  }, [])

  //@ts-ignore
  const Template = Component?.template || EmptyTemplate

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Template>
          <AlertSection>
            <Component {...pageProps} />
          </AlertSection>
        </Template>
      </ThemeProvider>
    </Provider>
  )
}

const EmptyTemplate = ({ children }: { children: React.ReactNode}) => <>{children}</>

export default MyApp;