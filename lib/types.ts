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
    img_url?: string;
};

export type ServiceType = {
    service_id?: number;          // Unique ID for each service
    title: string;               // Title of the service
    description: string;        // Optional description of the service
    created_on?: string;          // Date and time when the service was created (ISO string)
    creator_id?: string;          // ID of the student offering the service
    phone_number?: string;       // Optional phone number to contact the service provider
    location?: string;           // Optional location of the service
    image_url?: string;          // Optional URL to an image representing the service
    social_url_1?: string;       // Optional first social media or external link
    social_url_2?: string;       // Optional second social media or external link
    price?: number;              // Optional price for the service (can be null or undefined)
    type: "food" | "tutoring" | "other";
    first_name?: string;
    last_name?: string;
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

export type LocationType= {
    location_id?: number; // The unique identifier for the location (auto-incremented)
    name: string; // The name of the location
    location_type: "hospital" | "restaurant" | "accommodation" | "shopping" | "recreation" | "others"; // The type of location
    latitude: number; // The latitude of the location
    longitude: number; // The longitude of the location
    map_link?: string; // A link to a map location (optional)
    phone_number?: string; // Contact number for the location (optional)
    page_link?: string; // Official website or page link (optional)
    address?: string; // The physical address of the location (optional)
    description?: string; // A brief description of the location (optional)
    created_on?: string; // The timestamp when the record was created (optional, can be in ISO format)
}


export type UserType = {
    first_name: string;
    last_name: string;
    user_id: string;
    role: "default" | "admin";
}