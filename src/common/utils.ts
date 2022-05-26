import { TicketStatusType } from "./types";

export const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const ticketsLabel: any = {
    PENDING: 'Pendente',
    IN_PROGRESS: 'Em Andamento',
    FINISHED: 'Finalizado',
}