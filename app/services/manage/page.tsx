import React from 'react';
import {sql} from "@vercel/postgres";
import {currentUser} from "@clerk/nextjs/server";
import {ServiceType} from "@/lib/types";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {MapPin} from "lucide-react";
import {deleteService} from "@/lib/actions";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";

const ManageServicePage = async () => {
    const user = await currentUser();
    if (!user) return null;
    const {rows} = await sql`SELECT * FROM services WHERE creator_id = ${user.id} ORDER BY created_on DESC`
    const services = rows as ServiceType[]

    const handleDelete = async (data: FormData) => {
        "use server"
        const serviceId = data.get('serviceId');
        if (!serviceId) return;
        await deleteService(parseInt(serviceId.toString()));
    }
    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">Manage Services</h2>
            {
                services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <Card key={service.service_id}>
                                <CardHeader className="relative">
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                    <ScrollArea className="h-[150px] w-full rounded-md mt-4">
                                        {service.description}
                                    </ScrollArea>

                                    <Badge className={`bg-gray-400 absolute right-0 top-0 mr-2`}
                                           variant="default">{service.type.toUpperCase()}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">

                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4"/>
                                            <span>{service.location}</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            {
                                                service.social_url_1 && (
                                                    <Link href={service.social_url_1} className="w-full">
                                                        <Button variant={"outline"} className="w-full">

                                                            {service.social_url_1}
                                                        </Button>
                                                    </Link>)
                                            }
                                            {
                                                service.social_url_2 && (
                                                    <Link href={service.social_url_2} className="w-full">
                                                        <Button variant={"outline"} className="w-full">

                                                            {service.social_url_2}
                                                        </Button>
                                                    </Link>)
                                            }
                                        </div>

                                    </div>
                                </CardContent>

                                <CardFooter className="">
                                    <form action={handleDelete}>
                                        <input type="hidden" name="serviceId" value={service.service_id}/>
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

export default ManageServicePage;
