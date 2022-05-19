import { useEffect } from "react";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import ListTemplate from "../../src/common/templates/ListTemplate";
import { useGetTickets } from "../../src/features/tickets/hooks/useGetTickets";

const itemsPage = () => {
    const { data, getTickets } = useGetTickets()

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
            value: item.status,
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
            data={data}
            sectionName="Tickets"
            values={values}
        />
    )
}


itemsPage.template = AdminTemplate

export default itemsPage;

  