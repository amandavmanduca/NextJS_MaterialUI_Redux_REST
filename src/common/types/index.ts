export type CreateUser = {
    name: string;
    email: string;
    password: string;
}

export type LoginUser = {
    username: string;
    password: string;
}

type User = {
    id?: string;
    name: string;
    email: string;
    updatedAt?: Date;
    createdAt?: Date;
    deletedAt?: Date | null;
}

export type AuthUser = {
    token: string;
    session_duration_in_seconds: string;
    user: User;
}

export type Address = {
    cep: string;
    state: string;
    city: string;
    neightborhood: string;
    street: string;
    complement?: string;
    number: string;
    updatedAt?: Date;
    createdAt?: Date;
    deletedAt?: Date | null;
}

export type Responsible = {
    id?: string;
    telephone: string;
    isCompanyMainResponsible: boolean;
    company?: Company;
    isPlaceMainResponsible: boolean;
    place?: Place;
    address: Address;
    updatedAt?: Date;
    createdAt?: Date;
    deletedAt?: Date | null;
}

export type Company = {
    id?: string;
    name: string;
    cnpj: string;
    description: string;
    responsibles?: Responsible[]
    updatedAt?: Date;
    createdAt?: Date;
    deletedAt?: Date | null;
}

export enum TicketStatusType {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
}

export type Ticket = {
    id?: string;
    title: string;
    status: TicketStatusType;
    attendant_user: User;
    creator_user: User;
    place: Place;
    updatedAt?: Date;
    createdAt?: Date;
    deletedAt?: Date | null;
}

export type Place = {
    id?: string;
    name: string;
    company: Company;
    tickets?: Ticket[];
    responsibles?: Responsible[]
    address: Address;
    updatedAt?: Date;
    createdAt?: Date;
    deletedAt?: Date | null;
}

export type SlugInitialProps = {
    query: {
        slug: string;
    }
}

export type ListTemplateItem = {
    label: string;
    value: string | undefined;
}
