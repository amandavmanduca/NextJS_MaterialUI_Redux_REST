import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCreateUser } from '../src/features/sign-up/hooks/useCreateUser';
import { useRouter } from 'next/router';
import { fetchToken } from '../store/reducers/auth';
import { useDispatch } from 'react-redux';
import { Form, Formik, getIn } from 'formik';
import { FormTextField } from '../src/common/components/TextField';

import { CreateUser } from '../src/common/types';
import { signUpSchema } from '../src/features/sign-up/validation';

export default function SignUp() {
  const { create } = useCreateUser()

  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (values: CreateUser) => {
    await create({
        name: values.name,
        email: values.email,
        password: values.password,
    }).then(async (data) => {
      data.email && (
        await dispatch(fetchToken({ username: data.email, password: values.password })),
        router.push('/companies')
      )
    });
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Faça seu cadastro
          </Typography>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={signUpSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, touched, errors, handleChange, handleBlur }) => (
              <Form noValidate autoComplete="off">
                <Grid container gap="20px">
                  <FormTextField
                    label="Nome"
                    name="name"
                    value={values.name}
                    touched={touched.name}
                    error={getIn(errors, "name")}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                <FormTextField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    touched={touched.email}
                    error={getIn(errors, "email")}
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cadastrar
                </Button>
              </Form>
            )}
          </Formik>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Já possui uma conta? Faça login
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}
