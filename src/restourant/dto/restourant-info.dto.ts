export class RestourantInfo {
    name: string;
    description?: string;
    address: string;
    city: string;
    photo?: string;

    openingDetails: OpeningDetails | null; // null ako nisu ubacena u bazu radna vremena po danima
}

export class OpeningDetails {
    isOpened: boolean;

    openingTime: string | null;
    openingDay: string | null;

    closingTime: string | null;
}