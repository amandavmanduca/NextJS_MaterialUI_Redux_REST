import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { fetchToken } from '../store/reducers/auth';
import { LoginUser } from '../src/common/types';
import { Form, Formik, getIn } from 'formik';
import { FormTextField } from '../src/common/components/TextField';
import { loginSchema } from '../src/features/sign-in/validation';

function SignIn() {
    const dispatch = useDispatch()

    const handleSubmit = async (values: LoginUser) => {
        const data: LoginUser = {
          username: values.username,
          password: values.password,
        };
        if (data) {
          await dispatch(fetchToken({ username: data.username, password: data.password }));
        }
    };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secundary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Realize login
          </Typography>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, touched, errors, handleChange, handleBlur }) => (
              <Form noValidate autoComplete="off">
                <Grid container gap="20px">
                  <FormTextField
                    label="Email"
                    name="username"
                    type="email"
                    value={values.username}
                    touched={touched.username}
                    error={getIn(errors, "username")}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <FormTextField
                    label="Senha"
                    name="password"
                    type="password"
                    value={values.password}
                    touched={touched.password}
                    error={getIn(errors, "password")}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"N??o possui uma conta? Realize seu cadastro!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}

export default SignIn