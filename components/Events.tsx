"use client";
import {useState} from 'react'
import {Calendar, Clock, MapPin, User} from 'lucide-react'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Badge} from "@/components/ui/badge"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {EventType} from "@/lib/types";
import {convertTo12HourFormat} from "@/lib/helpers";

// // Mock data for events
// const events = [
//     {
//         id: 1,
//         title: "UIU Job Fair 2024",
//         start_date: "2024-03-15",
//         end_date: "2024-03-15",
//         start_time: "10:00:00",
//         end_time: "16:00:00",
//         venue: "UIU Auditorium",
//         organizer: "UIU Career Office",
//         category: "Career Events",
//         description: "Connect with top employers and explore career opportunities at the annual UIU Job Fair.",
//         registration_link: "#",
//     },
//     // Add more events here...
// ]

function Events({events}: { events: EventType[] }) {
    const [activeTab, setActiveTab] = useState("all")

    console.log(events)

    const filteredEvents = activeTab === "all" ? events : events.filter(event => event.category === activeTab)
    return (
        <>
            <Tabs defaultValue="all" className="mb-6 mx-auto">
                <TabsList color="green">
                    <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All Events</TabsTrigger>
                    <TabsTrigger value="official" onClick={() => setActiveTab("Official Events")}>Official</TabsTrigger>
                    <TabsTrigger value="club" onClick={() => setActiveTab("Club Events")}>Club</TabsTrigger>
                    <TabsTrigger value="other" onClick={() => setActiveTab("Other Activities")}>Other
                        Activities</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <Card key={event.id}>
                        <CardHeader className="relative">
                            {/*<img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-t-lg"/>*/}
                            <CardTitle className="text-xl">{event.title}</CardTitle>
                            <CardDescription>{event.category}</CardDescription>
                            <Badge className={`bg-green-400 absolute right-0 top-0 mr-2`} variant="default">Ongoing</Badge>

                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4"/>
                                    <span>{event.start_date.toDateString()}</span>
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
                            <ScrollArea className="h-[100px] w-full rounded-md mt-4">
                                {event.description}
                            </ScrollArea>

                        </CardContent>
                        <CardFooter className="">
                            {
                                event.registration_link && (
                                    <Link href={event.registration_link}>
                                        <Button>

                                            Register
                                        </Button>
                                    </Link>)
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/*<div className="mt-12">*/}
            {/*    <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>*/}
            {/*    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">*/}
            {/*        {events.slice(0, 3).map((event) => (*/}
            {/*            <Card key={event.id}>*/}
            {/*                <CardHeader>*/}
            {/*                    <CardTitle>{event.title}</CardTitle>*/}
            {/*                    <CardDescription>{event.start_date.toDateString()}</CardDescription>*/}
            {/*                </CardHeader>*/}
            {/*            </Card>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default Events;