"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {PlusIcon} from "lucide-react";
import {GearIcon} from "@radix-ui/react-icons";
import {Textarea} from "@/components/ui/textarea";
import {createAccommodation} from "@/lib/actions";
import Link from "next/link";


const AccommodationAddAndManage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        image_url: '',
        location: '',
        map_url: '',
        capacity: 0,
        room_type: 'private' as "private" | "shared",
        description: '',
        latitude: 0,
        longitude: 0,
        phone_number: '',
        rent: 0,
        available_from: '',
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createAccommodation(formData).then(() => {
            setFormData({
                title: '',
                image_url: '',
                location: '',
                map_url: '',
                capacity: 0,
                room_type: 'private',
                description: '',
                phone_number: '',
                rent: 0,
                latitude: 0,
                longitude: 0,
                available_from: '',
            })
            setIsOpen(false)
        });

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: id === 'rent' || id === 'capacity' || id === 'latitude' || id === 'longitude'
                ? Number(value)
                : value
        }));
    };

    return (
        <div className="absolute top-2 right-2 flex gap-2 ">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon"><PlusIcon/></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white overflow-auto max-h-full">
                    <DialogHeader>
                        <DialogTitle>Add New Listing</DialogTitle>
                        <DialogDescription>
                            Create a new listing by filling in the details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">

                        {/* Title */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input required id="title" placeholder="Listing Title" className="col-span-3"
                                   value={formData.title} onChange={handleInputChange}/>
                        </div>

                        {/* Description */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea required id="description" placeholder="Description" className="col-span-3"
                                      value={formData.description} onChange={handleInputChange}/>
                        </div>

                        {/* Image URL */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image_url" className="text-right">
                                Image URL
                            </Label>
                            <Input id="image_url" placeholder="Image URL" className="col-span-3"
                                   value={formData.image_url} onChange={handleInputChange}/>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Input required id="location" placeholder="Location" className="col-span-3"
                                   value={formData.location} onChange={handleInputChange}/>
                        </div>

                        {/* Latitude */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="latitude" className="text-right">
                                Latitude
                            </Label>
                            <Input required id="latitude" type="number" min={0} placeholder="Latitude"
                                   className="col-span-3"
                                   value={formData.latitude} onChange={handleInputChange}/>
                        </div>

                        {/* Longitude */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="longitude" className="text-right">
                                Longitude
                            </Label>
                            <Input required id="longitude" type="number" min={0} placeholder="Longitude"
                                   className="col-span-3"
                                   value={formData.longitude} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="map_url" className="text-right">
                                Map URL
                            </Label>
                            <Input id="map_url" placeholder="Map URL" className="col-span-3"
                                   value={formData.map_url} onChange={handleInputChange}/>
                        </div>

                        {/* Capacity */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="capacity" className="text-right">
                                Capacity
                            </Label>
                            <Input required id="capacity" type="number" min={1} placeholder="Capacity"
                                   className="col-span-3"
                                   value={formData.capacity} onChange={handleInputChange}/>
                        </div>

                        {/* Room Type */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="room_type" className="text-right">
                                Room Type
                            </Label>
                            <select id="room_type" value={formData.room_type} onChange={handleInputChange}
                                    className="col-span-3">
                                <option value="private">Private</option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>

                        {/* Phone Number */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone_number" className="text-right">
                                Phone Number
                            </Label>
                            <Input required id="phone_number" placeholder="Phone Number" className="col-span-3"
                                   value={formData.phone_number} onChange={handleInputChange}/>
                        </div>

                        {/* Rent */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rent" className="text-right">
                                Rent
                            </Label>
                            <Input required id="rent" type="number" min={0} placeholder="Rent Amount"
                                   className="col-span-3"
                                   value={formData.rent} onChange={handleInputChange}/>
                        </div>

                        {/* Available From */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="available_from" className="text-right">
                                Available From
                            </Label>
                            <Input required id="available_from" type="date" placeholder="Available From"
                                   className="col-span-3"
                                   value={formData.available_from} onChange={handleInputChange}/>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Link href={"/accommodation/manage"}>
                <Button variant="outline" size="icon"><GearIcon/></Button>
            </Link>
        </div>
    );
};

export default AccommodationAddAndManage;
