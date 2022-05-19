import { Box, Button, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { MouseEventHandler } from "react"
import AdminTemplate from "../AdminTemplate"

const ListTemplate = ({
    data,
    sectionName,
    buttonName,
    handleButtonPath,
    values,
}: {
    data: any[],
    sectionName: string,
    buttonName?: string,
    handleButtonPath?: string,
    values: any
}) => {
    const router = useRouter()
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
                <Typography component="h1" variant="h5">
                    {sectionName}
                </Typography>
                {buttonName && handleButtonPath && (
                    <Button onClick={() => router.push(handleButtonPath)}>
                        {buttonName}
                    </Button>
                )}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'grid',
                        gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                    {data?.map((item: any) => (
                        <Box
                            key={item.id}
                            style={{
                                borderRadius: '10px',
                                display: 'grid',
                                backgroundColor: '#FAFAFA',
                                padding: '20px 30px',
                                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.3)',
                                gap: '15px',
                            }}>
                            {values?.map((value: any, index: number) => value?.[0]?.value === item.id &&
                                value?.map((items: any, newIndex: number) => items?.label !== 'id' && (
                                    <Box key={value?.[0]?.label + newIndex} style={{ display: 'grid' }}>
                                        <Typography component="p" fontSize="10px">
                                            {items.label}
                                        </Typography>
                                        <Typography component="p" lineHeight="15px">
                                            {items.value}
                                        </Typography>
                                    </Box>
                                ))
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

ListTemplate.template = AdminTemplate

export default ListTemplate