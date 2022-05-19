import useForceLogout from "./useForceLogout";

const { logout } = useForceLogout()

export async function getServerSideProps() {
    return {
        redirect: {
            permanent: false,
            destination: "/"
        }
    }
}

export const useLoginTimeout = (duration: string) => {
    setTimeout(() => {
        logout();
    }, Number(duration)*1000)
}