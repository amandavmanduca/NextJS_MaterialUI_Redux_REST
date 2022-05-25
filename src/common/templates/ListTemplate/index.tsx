import { Box, Button, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"
import AdminTemplate from "../AdminTemplate"
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const ListTemplate = ({
    sectionName,
    buttonName,
    handleButtonPath,
    handleEditPath,
    handleDeleteOne,
    values,
    refetch,
}: {
    sectionName: string,
    buttonName?: string,
    handleButtonPath?: string,
    handleEditPath: string,
    handleDeleteOne: (id: string) => Promise<void>,
    values: any[],
    refetch?: any,
}) => {
    const router = useRouter()
    const handleDelete = async (id: string) => {
        await handleDeleteOne(id)
        refetch()
    }
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
                        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
                        gap: '20px',
                        width: '100%',
                    }}>
                    {values?.map((items: any, index: number) => (
                        <Box
                            key={index}
                            style={{
                                borderRadius: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '30px',
                                width: '100%',
                                backgroundColor: '#FAFAFA',
                                padding: '20px 30px',
                                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.3)',
                            }}>
                            <Box style={{ display: 'grid', gap: '15px' }}>
                                {items?.map((value: any, newIndex: number) => value?.label !== 'id' && (
                                    <Box key={newIndex} style={{ display: 'grid' }}>
                                        <Typography component="p" fontSize="10px">
                                            {value.label}
                                        </Typography>
                                        <Typography component="p" lineHeight="15px">
                                            {value.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                <DeleteIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(items[0].value)}
                                />
                                <ModeEditIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => router.push(handleEditPath + items[0].value)}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

ListTemplate.template = AdminTemplate

export default ListTemplate