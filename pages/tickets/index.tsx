import { useEffect } from "react";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import ListTemplate from "../../src/common/templates/ListTemplate";
import { ticketsLabel } from "../../src/common/utils";
import { useDeleteTicket } from "../../src/features/tickets/hooks/useDeleteTicket";
import { useGetTickets } from "../../src/features/tickets/hooks/useGetTickets";

const itemsPage = () => {
    const { data, getTickets } = useGetTickets()
    const { deleteOne } = useDeleteTicket()

    useEffect(() => {
        getTickets()
    }, [])

    const values = data?.map((item: any) => ([
        {
            label: 'id',
            value: item.id,
        },
        {
            label: 'Status',
            value: ticketsLabel[item.status],
        },
        {
            label: 'Título',
            value: item.title,
        },
        {
            label: 'Local',
            value: item.place.name,
        },
    ]))

    return (
        <ListTemplate
            sectionName="Tickets"
            handleEditPath="/tickets/"
            values={values}
            handleDeleteOne={deleteOne}
            refetch={getTickets}
        />
    )
}


itemsPage.template = AdminTemplate

export default itemsPage;

  