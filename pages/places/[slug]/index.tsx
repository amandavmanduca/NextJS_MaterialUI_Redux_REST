import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullPlaceForm from "../../../src/common/components/FullPlaceForm";
import AdminTemplate from "../../../src/common/templates/AdminTemplate";
import FormAreaTemplate from "../../../src/common/templates/FormAreaTemplate";
import { Place, Responsible, SlugInitialProps } from "../../../src/common/types";
import { useGetPlaceById } from "../../../src/features/places/hooks/useGetPlaceById";
import { useUpdatePlace } from "../../../src/features/places/hooks/useUpdatePlace";

const UpdatePlace = ({ slug }: { slug: string }) => {
    const { getPlace, data } = useGetPlaceById()
    const router = useRouter()
    const { update } = useUpdatePlace()
    const [initialValues, setInitialValues] = useState<Place | null>(null)

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
        <FormAreaTemplate>
            <Typography component="h1" variant="h5" marginBottom="20px">
                Editando Local "{initialValues?.name}"
            </Typography>
            {initialValues &&
            <FullPlaceForm
                initialValues={initialValues}
                onSubmit={async (values: Place) => {
                const { responsibles, ...rest } = values
                const formatedResponsibles = responsibles?.map((r: Responsible) => {
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
        />}
      </FormAreaTemplate>
    )
}

UpdatePlace.template = AdminTemplate

export default UpdatePlace;

UpdatePlace.getInitialProps = ({ query: { slug } }: SlugInitialProps) => {
    return { slug };
};