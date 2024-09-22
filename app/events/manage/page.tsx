import React from 'react';
import {sql} from "@vercel/postgres";
import {currentUser} from "@clerk/nextjs/server";
import {EventType} from "@/lib/types";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar, Clock, MapPin, User} from "lucide-react";
import {convertTo12HourFormat} from "@/lib/helpers";
import {deleteEvent} from "@/actions";

const ManageEventsPage = async () => {
    const user = await currentUser();
    if (!user) return null;
    const {rows} = await sql`SELECT * FROM events WHERE creator = ${user.id}`
    const events = rows as EventType[]

    const handleDelete = async (data:FormData) => {
        "use server"
        const eventId = data.get('eventId');
        if (!eventId) return;
        await deleteEvent(parseInt(eventId.toString()));
    }
    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">Manage Events</h2>
            {
                events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <Card key={event.id}>
                                <CardHeader className="relative">
                                    <CardTitle className="text-xl">{event.title}</CardTitle>
                                    <CardDescription>{event.category.toUpperCase()}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4"/>
                                            <span>{new Date(event.start_date).toDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4"/>
                                            <span>{convertTo12HourFormat(event.start_time)} - {convertTo12HourFormat(event.end_time)}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4"/>
                                            <span>{event.venue}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <User className="mr-2 h-4 w-4"/>
                                            <span>{event.organizer}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="">
                                    <form action={handleDelete}>
                                        <input type="hidden" name="eventId" value={event.id}/>
                                        <Button type={"submit"} variant="destructive" size="default">Delete</Button>
                                    </form>

                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh]">
                        <p className="text-2xl">You have not created any events yet.</p>
                    </div>
                )
            }

        </div>
    );
};

export default ManageEventsPage;
