import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetPlaces } from "../../src/features/places/hooks/useGetPlaces";

const PlacesPage = () => {
    const { data, getPlaces } = useGetPlaces()
    const router = useRouter()

    useEffect(() => {
        getPlaces()
    }, [])

    return (
        <div style={{ display: 'flex', gap: '30px' }}>
            {data?.map((place: any) => (
                <div key={place.id}>
                    <h1>{place.name}</h1>
                    <p>Endereço</p>
                    <p>{place.address.street}, {place.address.number}{place.address.complement && `/${place.address.complement}`}</p>
                    <p>{place.address.city}/{place.address.state}</p>
                    <h3
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/places/${place.id}`)}
                    >
                        Ver detalhes
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default PlacesPage;

  