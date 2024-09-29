"use client";
import {useState} from 'react'
import {DollarSign, Map, PhoneCall, SquareArrowOutUpRight, Users} from 'lucide-react'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {AccommodationType} from "@/lib/types";
import {Badge} from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import Link from "next/link";


function Accommodation({accommodations}: { accommodations: AccommodationType[] }) {
    const [activeTab, setActiveTab] = useState("all")

    const filteredRooms = activeTab === "all" ? accommodations : accommodations.filter(accommodation => accommodation.room_type === activeTab)

    console.log(filteredRooms)
    return (
        <>
            <Tabs defaultValue="all" className="mb-6 mx-auto">
                <TabsList>
                    <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All Events</TabsTrigger>
                    <TabsTrigger value="shared" onClick={() => setActiveTab("shared")}>Shared Room</TabsTrigger>
                    <TabsTrigger value="private" onClick={() => setActiveTab("private")}>Private Room</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRooms.map((room) => (
                    <div key={room.accommodation_id} className="overflow-hidden rounded-lg border relative">
                        <Badge className="absolute top-2 right-2"
                               variant="secondary">{room.room_type.toUpperCase()}</Badge>
                        <img
                            src={room.image_url}
                            alt={room.title}
                            className="object-cover w-full h-48"
                            width={400}
                            height={200}
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="font-bold">{room.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{room.location}</p>
                            <div className="flex items-center gap-4 text-sm leading-3">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4"/>
                                    <span>{room.capacity} {room.capacity < 2 ? "Person" : "People"}</span>
                                </div>

                                <div className="flex items-center gap-1 p-0 m-0">
                                    <DollarSign className="w-4 h-4"/>
                                    <span>{room.rent}/month</span>
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger className="bg-slate-900 text-white w-full p-2 rounded-lg"> View Details
                                </DialogTrigger>
                                <DialogContent className="bg-white max-h-full overflow-y-auto">
                                    <DialogHeader>
                                        <img
                                            src={room.image_url}
                                            alt={room.title}
                                            className="object-cover w-full h-48"
                                            width={400}
                                            height={200}
                                        />
                                        <DialogTitle>{room.title}</DialogTitle>
                                        <DialogDescription>
                                            {room.description}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogBody>
                                        <div className="flex flex-col items-center gap-4 text-sm leading-3 ">
                                            <div className="flex flex-col items-center gap-1">
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger> <Users className="w-4 h-4"/>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Room capacity</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <span>{room.capacity} {room.capacity < 2 ? "Person" : "People"}</span>
                                            </div>

                                            <div className="flex flex-col items-center gap-1">
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger><DollarSign
                                                            className="w-4 h-4"/></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Rent per month</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>


                                                <span>{room.rent}/month</span>
                                            </div>


                                            <div className="flex flex-col items-center gap-1">
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger><Map
                                                            className="w-4 h-4"/></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Location</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <div className="flex gap-2 justify-center items-center">

                                                <span>{room.location}</span>
                                                    {
                                                        room.map_url && <Link target="_blank" href={room.map_url}>
                                                        <SquareArrowOutUpRight className="w-4 h-4 text-gray-700 hover:text-blue-700"/>
                                                        </Link>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </DialogBody>
                                    <div className="flex justify-center items-center text-sm text-center bg-accent p-2 rounded-lg flex-row gap-2 ">
                                        <PhoneCall className="h-4 w-4"/>
                                        <h1>
                                            {room.first_name} {room.last_name} :
                                            <span className="ml-2 font-bold">
                                            {room.phone_number}
                                        </span>
                                        </h1>
                                    </div>

                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>
                ))}
            </div>


        </>
    );
}

export default Accommodation;