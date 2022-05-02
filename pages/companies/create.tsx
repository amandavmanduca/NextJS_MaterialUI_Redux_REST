import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useCreateCompany } from '../../src/features/companies/hooks/useCreateCompany';
import { searchCep } from '../../src/common/hooks/useSearchCep';
import { useSelector, useDispatch } from 'react-redux'
import { addResponsibleToCompany, removeResponsibleFromCompany, setCompanyData } from '../../store/ducks/actions/main';


const theme = createTheme();

export default function CreateCompany() {
  const { create } = useCreateCompany()
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState<{
    severity: AlertColor;
    message: string;
  }>({
      severity: "success",
      message: '',
  })

  const companyData = useSelector((state: any) => state?.companyData)
  const dispatch = useDispatch()

  console.log(companyData)
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = await create({
            name: String(formData.get('name')),
            cnpj: String(formData.get('cnpj')),
            description: String(formData.get('description')),
            responsibles: [],
        });
        dispatch(setCompanyData(data))
        const testeResponsible = {
          name: "responsible name"
        }
        const testeResponsible2 = {
          name: "name"
        }
        dispatch(addResponsibleToCompany(testeResponsible))
        dispatch(addResponsibleToCompany(testeResponsible2))
        dispatch(removeResponsibleFromCompany(testeResponsible))
        if (data) {
            setModal({
                severity: 'success',
                message: `Usuário criado com sucesso`
            })
            
        } else {
            setModal({
                severity: 'warning',
                message: `Erro ao realizar cadastro`
            })
        }
        setOpen(true);
    };
    const [fullAddress, setFullAddress] = React.useState<any>()
    async function getAddress(cep: string) {
        if (cep.length === 8) {
            const address = await searchCep(cep);
            setFullAddress(address)
        }
    }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
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
            Cadastro de Empresa
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="cnpj"
                  label="CNPJ"
                  InputLabelProps={{ shrink: true }}
                  name="cnpj"
                  autoComplete="cnpj"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Descrição"
                  InputLabelProps={{ shrink: true }}
                  id="description"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity={modal.severity} sx={{ width: '100%' }}>
                {modal.message}
            </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
    </>
  );
}
