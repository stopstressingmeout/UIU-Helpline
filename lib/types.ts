export type EventType = {
    id?: number;
    title: string;
    start_date: string;  // 'YYYY-MM-DD' format
    start_time: string;  // 'HH:MM:SS' format
    end_time: string;    // 'HH:MM:SS' format
    venue: string;
    organizer: string;
    category: "official" | "club" | "other";
    description: string;
    registration_link: string;
    creator?: string;
};
