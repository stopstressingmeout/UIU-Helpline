export type EventType = {
    event_id?: number;
    title: string;
    event_date: string;  // 'YYYY-MM-DD' format
    start_time: string;  // 'HH:MM:SS' format
    end_time: string;    // 'HH:MM:SS' format
    venue: string;
    organizer: string;
    category: "official" | "club" | "other";
    description: string;
    registration_link: string;
    creator_id?: string;
    created_on?: string;
};


export type AccommodationType = {
    accommodation_id?: number;              // Unique identifier for the room
    title: string;                // Title of the room
    image_url?: string;           // URL of the room image (optional)
    creator_id?: string;           // ID of the creator (foreign key)
    location: string;             // Location of the accommodation
    map_url?: string;             // URL of the room location on Google Maps (optional)
    room_type: "private" | "shared" // Type of room
    capacity: number;             // Maximum capacity of the room
    phone_number: string;         // Contact phone number
    description?: string;         // Description of the room (optional)
    rent: number;                 // Monthly rent amount
    latitude: number;             // Latitude of the room location
    longitude: number;            // Longitude of the room
    created_on?: string;
    first_name?: string;
    last_name?: string;
    available_from: string;
};
