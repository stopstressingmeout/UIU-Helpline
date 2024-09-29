"use server";

import {AccommodationType, EventType, ServiceType} from "@/lib/types";
import {sql} from "@vercel/postgres";
import {currentUser} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export const createAccommodation = async (accommodationData: AccommodationType) => {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to create an accommodation listing")
    await sql`INSERT INTO accommodations
    (title, image_url, creator_id, location, map_url, room_type, capacity, phone_number, description, rent, latitude, longitude, available_from)
VALUES
    (${accommodationData.title}, ${accommodationData.image_url}, ${user.id}, ${accommodationData.location}, ${accommodationData.map_url}, ${accommodationData.room_type}, ${accommodationData.capacity}, ${accommodationData.phone_number}, ${accommodationData.description}, ${accommodationData.rent}, ${accommodationData.latitude}, ${accommodationData.longitude}, ${accommodationData.available_from})`

    revalidatePath('/accommodation')
}

export const deleteAccommodation = async (accommodationId: number) => {
    const user = await currentUser();

    console.log(user, accommodationId)
    if (!user) throw new Error("You must be logged in to delete an accommodation listing")
    await sql`DELETE FROM accommodations WHERE accommodation_id = ${accommodationId} AND creator_id = ${user.id}`
    revalidatePath('/accommodation')
}

export const createEvent = async (eventData: EventType) => {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to create an accommodation listing.")
    await sql`INSERT INTO events 
    (title, event_date, start_time, end_time, venue, organizer, category, description, registration_link, creator_id)
VALUES
    (${eventData.title}, ${eventData.event_date}, ${eventData.start_time}, ${eventData.end_time}, ${eventData.venue}, ${eventData.organizer}, ${eventData.category}, ${eventData.description}, ${eventData.registration_link}, ${user.id})`

    revalidatePath('/events')
}

export const deleteEvent = async (eventId: number) => {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to delete an event")
    await sql`DELETE FROM events WHERE event_id = ${eventId} AND creator_id = ${user.id}`
    revalidatePath('/events')
}

export const createService = async (serviceData: ServiceType) => {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to create a new service.")
    await sql`INSERT INTO services 
    (title, description, creator_id, phone_number, location, image_url, social_url_1, social_url_2, price, type)
VALUES
    (${serviceData.title}, ${serviceData.description}, ${user.id}, ${serviceData.phone_number}, ${serviceData.location}, ${serviceData.image_url}, ${serviceData.social_url_1}, ${serviceData.social_url_2}, ${serviceData.price}, ${serviceData.type})`

    revalidatePath('/services')
}

export const deleteService = async (serviceId: number) => {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to delete a service")
    await sql`DELETE FROM services WHERE service_id = ${serviceId} AND creator_id = ${user.id}`
    revalidatePath('/services')
}