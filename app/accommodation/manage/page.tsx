import React from 'react';
import {sql} from "@vercel/postgres";
import {currentUser} from "@clerk/nextjs/server";
import {AccommodationType} from "@/lib/types";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar, Map, MapPin, User} from "lucide-react";
import {deleteAccommodation} from "@/lib/actions";
import Link from "next/link";

const ManageAccommodationsPage = async () => {
    const user = await currentUser();
    if (!user) return null;
    const {rows} = await sql`SELECT * FROM accommodations WHERE creator_id = ${user.id} ORDER BY created_on DESC`
    const accommodations = rows as AccommodationType[]

    console.log(accommodations)

    const handleDelete = async (data: FormData) => {
        "use server"
        const accommodationId = data.get('accommodationId');
        if (!accommodationId) return;
        await deleteAccommodation(parseInt(accommodationId.toString()));
    }
    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">Manage Accommodations</h2>
            {
                accommodations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {accommodations.map((accommodation) => (
                            <Card key={accommodation.accommodation_id}>
                                <CardHeader className="relative">
                                    <img src={!!accommodation.image_url ? accommodation.image_url : "/placeholder.jpg"}
                                         alt={accommodation.title}
                                         className="w-full h-40 object-cover rounded-t-lg"/>
                                    <CardTitle className="text-xl">{accommodation.title}</CardTitle>
                                    <CardDescription>{accommodation.room_type.toUpperCase()}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4"/>
                                            <span>{new Date(accommodation.available_from).toDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Map className="mr-2 h-4 w-4"/>
                                            {
                                                accommodation.map_url ? (
                                                    <Link className="text-blue-700"
                                                          href={accommodation.map_url}>{accommodation.location}</Link>
                                                ) : <span>
                                                    {accommodation.location}
                                                </span>
                                            }
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4"/>
                                            <span>{accommodation.latitude},{
                                                accommodation.longitude
                                            }</span>
                                        </div>
                                        <div className="flex items-center">
                                            <User className="mr-2 h-4 w-4"/>
                                            <span>{accommodation.capacity}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="">
                                    <form action={handleDelete}>
                                        <input type="hidden" name="accommodationId" value={accommodation.accommodation_id}/>
                                        <Button type={"submit"} variant="destructive" size="default">Delete</Button>
                                    </form>

                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh]">
                        <p className="text-2xl">You have not created any accommodation listings yet.</p>
                    </div>
                )
            }

        </div>
    );
};

export default ManageAccommodationsPage;
