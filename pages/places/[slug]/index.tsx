import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullPlaceForm from "../../../src/common/components/FullPlaceForm";
import AdminTemplate from "../../../src/common/templates/AdminTemplate";
import { useGetPlaceById } from "../../../src/features/places/hooks/useGetPlaceById";
import { useUpdatePlace } from "../../../src/features/places/hooks/useUpdatePlace";

const UpdatePlace = ({ slug }: any) => {
    const { getPlace, data } = useGetPlaceById()
    const router = useRouter()
    const { update } = useUpdatePlace()
    const [initialValues, setInitialValues] = useState<any>(null)

    const loggedUserId: string = useSelector((data: any) => data?.auth?.data?.user?.id)

    useEffect(() => {
        if (slug) {
            getPlace(slug)
        }
    }, [])

    useEffect(() => {
        if(data) {
            setInitialValues(data)
        }
    }, [data])

    return (
        initialValues &&
        <FullPlaceForm
            initialValues={initialValues}
            onSubmit={async (values: any) => {
            const { responsibles, ...rest } = values
            const formatedResponsibles = responsibles?.map((r: any) => {
                const { id, ...rest } = r
                if (String(id)?.includes('.')) {
                    return { ... rest }
                } else {
                    return { ...r }
                }
            })
            await update(slug, {
                ...rest,
                creator_userId: loggedUserId,
                responsibles: formatedResponsibles
            }).then(() => router.push('/places'))
        }}
      />
    )
}

UpdatePlace.template = AdminTemplate

export default UpdatePlace;

UpdatePlace.getInitialProps = ({ query: { slug } }: any) => {
    return { slug };
};