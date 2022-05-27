import { Box, Container, Grid } from "@mui/material"

const FormAreaTemplate = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid padding="40px">
                    {children}
                </Grid>
            </Box>
        </Container>
    )
}

export default FormAreaTemplate;