import { useEffect, useState } from "react";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import ListTemplate from "../../src/common/templates/ListTemplate";
import { ListTemplateItem, Ticket } from "../../src/common/types";
import { ticketsLabel } from "../../src/common/utils";
import { useDeleteTicket } from "../../src/features/tickets/hooks/useDeleteTicket";
import { useGetTickets } from "../../src/features/tickets/hooks/useGetTickets";

const itemsPage = () => {
    const { data, getTickets } = useGetTickets()
    const { deleteOne } = useDeleteTicket()
    const [values, setValues] = useState<Array<ListTemplateItem[]> | []>([])

    useEffect(() => {
        getTickets()
    }, [])

    useEffect(() => {
        if (data) {
            const items: Array<ListTemplateItem[]> = data?.map((item: Ticket) => ([
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
            setValues(items)
        }
    }, [data])

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

  