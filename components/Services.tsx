"use client";
import {useState} from 'react'
import {MapPin, User} from 'lucide-react'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Badge} from "@/components/ui/badge"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ServiceType} from "@/lib/types";

function Services({services}: { services: ServiceType[] }) {
    const [activeTab, setActiveTab] = useState("all")

    const filteredServices = activeTab === "all" ? services : services.filter(service => service.type == activeTab)

    return (
        <>
            <Tabs defaultValue="all" className="mb-6 mx-auto">
                <TabsList>
                    <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All Events</TabsTrigger>
                    <TabsTrigger value="food" onClick={() => setActiveTab("food")}>Food</TabsTrigger>
                    <TabsTrigger value="tutoring" onClick={() => setActiveTab("tutoring")}>Tutoring</TabsTrigger>
                    <TabsTrigger value="other" onClick={() => setActiveTab("other")}>Other
                        Services</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <Card key={service.service_id}>
                        <CardHeader className="relative">
                            <img
                                src={!!service.image_url ? service.image_url : "/placeholder.jpg"}
                                alt={service.title}
                                className="object-cover w-full h-48"
                                width={400}
                                height={200}
                            /> <CardTitle className="text-xl">{service.title}</CardTitle>

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
                                <div className="flex items-center">
                                    <User className="mr-2 h-4 w-4"/>
                                    <span>{service.first_name} {service.last_name}</span>
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex flex-col justify-center gap-2">
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
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </>
    );
}

export default Services;