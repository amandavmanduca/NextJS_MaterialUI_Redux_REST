import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminTemplate from "../../../src/common/templates/AdminTemplate";

import { useGetTicketById } from "../../../src/features/tickets/hooks/useGetTicketById";
import { Button } from "@material-ui/core";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useUpdateTicket } from "../../../src/features/tickets/hooks/useUpdateTicket";
import { ticketsLabel } from "../../../src/common/utils";


const UpdateTicket = ({ slug }: any) => {
    const { getTicket, data } = useGetTicketById()
    const { update } = useUpdateTicket()
    const router = useRouter()
    const [initialValues, setInitialValues] = useState<any>({})
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (slug) {
            getTicket(slug)
        }
    }, [])

    useEffect(() => {
        if(data) {
            setInitialValues(data)
            setStatus(data?.status)
        }
    }, [data])

    const statusOptions = [
        {
            value: "PENDING",
            label: ticketsLabel["PENDING"],
        },
        {
            value: "IN_PROGRESS",
            label: ticketsLabel["IN_PROGRESS"],
        },
        {
            value: "FINISHED",
            label: ticketsLabel["FINISHED"],
        },
    ]

    const handleStatus = async () => {
        await update(slug, { status: status }).then(() => router.push('/tickets'))
    }

    return (
        initialValues &&
        <div>
            <p>{ticketsLabel[data?.status]}</p>
            <p>{data?.title}</p>
            <p>{data?.createdAt}</p>
            <p>{data?.updatedAt}</p>
            <p>{data?.place?.name}</p>
            <p>{data?.attendant_user?.name}</p>
            <p>{data?.creator_user?.name}</p>
            <FormControl style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label">Atualizar Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={status}
                    label="Atualizar Status"
                    onChange={(value: any) => setStatus(value.target.value)}
                >
                    {statusOptions?.map(c => (
                        <MenuItem key={c.value} style={{ width: '100%' }} value={c.value}>{c.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                onClick={() => handleStatus()}
                type="submit"
                color="primary"
                variant="contained"
            >
                Salvar
            </Button>
        </div>
    )
}

UpdateTicket.template = AdminTemplate

export default UpdateTicket;

UpdateTicket.getInitialProps = ({ query: { slug } }: any) => {
    return { slug };
};