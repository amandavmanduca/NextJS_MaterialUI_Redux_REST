import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertColor, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { useCreateCompany } from '../../src/features/companies/hooks/useCreateCompany';
import { searchCep } from '../../src/common/hooks/useSearchCep';
import { getCompanyArray } from '../../src/common/hooks/useCompanyArray';
import { useListCompanies } from '../../src/features/companies/hooks/useListCompanies';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function CreatePlace() {
  const { create } = useCreateCompany()
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState<{
    severity: AlertColor;
    message: string;
  }>({
      severity: "success",
      message: '',
  })
  const [companyOptions, setCompanyOptions] = React.useState<any[]>([]) 
  const { data, listCompanies } = useListCompanies();
  const [selectedCompany, setSelectedCompany] = React.useState<string>()

  React.useEffect(() => {
      listCompanies()
  }, [])

  React.useEffect(() => {
    if(data) {
        const options = data?.map((c: any) => ({
            value: c.id,
            label: c.name
        }))
        setCompanyOptions(options)
    }
  }, [data])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(event.currentTarget)
        const data = await create({
            name: String(formData.get('name')),
            address: {
                state: String(formData.get('state')),
                city: String(formData.get('city')),
                neighborhood: String(formData.get('neighborhood')),
                street: String(formData.get('street')),
                number: String(formData.get('number')),
                complement: String(formData.get('complement')),
            }
        });
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
        let address = null
        if (cep.length === 8) {
            address = await searchCep(cep);
        }
        if (address) {
            setFullAddress(address)
        } else {
            setFullAddress({
                localidade: '',
                bairro: '',
                uf: '',
                logradouro: '',
            })
        }
    }

  return (
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
            Cadastro de Local
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
                  name="cep"
                  label="CEP"
                  InputLabelProps={{ shrink: true }}
                  id="cep"
                  onChange={(e) => getAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
              <FormControl style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Empresa</InputLabel>
                    <Select
                        id="company"
                        style={{ width: '100%' }}
                        value={selectedCompany}
                        label="Empresa"
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        {companyOptions?.map((item: any) => (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>))}
                    </Select>
                    </FormControl>
                </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  value={fullAddress?.uf}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Estado"
                  id="state"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  value={fullAddress?.localidade}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Cidade"
                  id="city"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="neighborhood"
                  value={fullAddress?.bairro}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Bairro"
                  id="neighborhood"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  value={fullAddress?.logradouro}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Rua"
                  id="street"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  InputLabelProps={{ shrink: true }}
                  label="Nº"
                  id="number"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  name="complement"
                  InputLabelProps={{ shrink: true }}
                  label="Complemento"
                  id="complement"
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
        <Copyright sx={{ mt: 5 }} />
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity={modal.severity} sx={{ width: '100%' }}>
                {modal.message}
            </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
