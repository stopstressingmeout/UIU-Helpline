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

function Events({events}: { events: EventType[] }) {
    const [activeTab, setActiveTab] = useState("all")

    const filteredEvents = activeTab === "all" ? events : events.filter(event => event.category === activeTab)

    console.log(new Date())
    return (
        <>
            <Tabs defaultValue="all" className="mb-6 mx-auto">
                <TabsList color="green">
                    <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All Events</TabsTrigger>
                    <TabsTrigger value="official" onClick={() => setActiveTab("official")}>Official</TabsTrigger>
                    <TabsTrigger value="club" onClick={() => setActiveTab("club")}>Club</TabsTrigger>
                    <TabsTrigger value="other" onClick={() => setActiveTab("other")}>Other
                        Activities</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <Card key={event.event_id}>
                        <CardHeader className="relative">
                            <img src={!!event.img_url ? event.img_url: "/placeholder.jpg"} alt={event.title} className="w-full h-40 object-cover rounded-t-lg"/>
                            <CardTitle className="text-xl">{event.title}</CardTitle>
                            <CardDescription>{event.category.toUpperCase()}</CardDescription>
                            {
                                new Date(event.event_date).toDateString() == new Date().toDateString() && (
                                    <Badge className={`bg-green-400 absolute right-0 top-0 mr-2`} variant="default">Today</Badge>)
                            }


                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4"/>
                                    <span>{new Date(event.event_date).toDateString()}</span>
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
            {/*                    <CardDescription>{event.event_date.toDateString()}</CardDescription>*/}
            {/*                </CardHeader>*/}
            {/*            </Card>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default Events;