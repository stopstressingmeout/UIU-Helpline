"use server";

import {EventType} from "@/lib/types";
import {sql} from "@vercel/postgres";
import {currentUser} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export const createEvent = async (eventData: EventType) => {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to create an event")
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