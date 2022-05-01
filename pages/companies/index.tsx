import { ThemeProvider } from "@emotion/react"
import { Box, Container, createTheme, Typography } from "@mui/material"
import { useEffect } from "react";
import { searchCep } from "../../src/common/hooks/useSearchCep";
import { useListCompanies } from "../../src/features/companies/hooks/useListCompanies";


const theme = createTheme();

export default function Companies() {
    const { data, listCompanies } = useListCompanies();

    useEffect(() => {
        listCompanies()
    }, [])
    
    return(
        <ThemeProvider theme={theme}>
            <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h1" variant="h5">
                        Empresas
                    </Typography>
                    {data?.map((company: any) => (
                        <Box key={company.id}>
                            <Typography component="p">
                                {company.name}
                            </Typography>
                            <Typography component="p">
                                {company.cnpj}
                            </Typography>
                            <Typography component="p">
                                {company.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </ThemeProvider>
    )
}