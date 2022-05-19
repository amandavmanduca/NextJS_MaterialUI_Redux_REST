import { useEffect } from "react";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import ListTemplate from "../../src/common/templates/ListTemplate";
import { useGetPlaces } from "../../src/features/places/hooks/useGetPlaces";

const PlacesPage = () => {
    const { data, getPlaces } = useGetPlaces()

    useEffect(() => {
        getPlaces()
    }, [])

    const values = data?.map((item: any) => ([
        {
            label: 'id',
            value: item.id,
        },
        {
            label: 'Nome',
            value: item.name,
        },
        {
            label: 'Endereço',
            value: item.address.street + ', ' + item.address.number + ' ' + item.address.complement && `/${item.address.complement}`,
        },
        {
            label: 'Cidade',
            value: item.address.city + '/' + item.address.state,
        },
    ]))

    return (
        <ListTemplate
            buttonName="+ Adicionar Local"
            handleButtonPath="/places/create"
            data={data}
            sectionName="Locais"
            values={values}
        />
    )
}


PlacesPage.template = AdminTemplate

export default PlacesPage;

  