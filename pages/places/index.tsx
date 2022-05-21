import { useEffect } from "react";
import AdminTemplate from "../../src/common/templates/AdminTemplate";
import ListTemplate from "../../src/common/templates/ListTemplate";
import { useDeletePlace } from "../../src/features/places/hooks/useDeletePlace";
import { useGetPlaces } from "../../src/features/places/hooks/useGetPlaces";

const PlacesPage = () => {
    const { data, getPlaces } = useGetPlaces()
    const { deleteOne } = useDeletePlace()

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
            value: `${item.address.street} nº${item.address.number}`,
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
            handleEditPath="/places/"
            sectionName="Locais"
            values={values}
            handleDeleteOne={deleteOne}
            refetch={getPlaces}
        />
    )
}

PlacesPage.template = AdminTemplate

export default PlacesPage;

  