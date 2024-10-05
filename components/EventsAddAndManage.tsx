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
import {createEvent} from "@/lib/actions";
import Link from "next/link";
import {UploadButton} from "@/lib/utils";
import Image from "next/image";


const EventsAddAndManage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [uploadImage, setUploadImage] = useState<undefined | string>(undefined)
    const [formData, setFormData] = useState({
        title: '',
        event_date: '',
        start_time: '',
        end_time: '',
        venue: '',
        organizer: '',
        category: 'official' as "official" | "club" | "other",
        description: '',
        registration_link: ''
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (formData.end_time < formData.start_time) {
            alert("End time cannot be before start time!");
            return;
        }
        createEvent({...formData,img_url:uploadImage ?? ""}).then(() => {
            setFormData({
                title: '',
                event_date: '',
                start_time: '',
                end_time: '',
                venue: '',
                organizer: '',
                category: 'official',
                description: '',
                registration_link: ''
            })
            setIsOpen(false)
        });

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
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
                        <DialogTitle>Create Event</DialogTitle>
                        <DialogDescription>
                            Create a new event by filling in the details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input required id="title" placeholder="Event Title" className="col-span-3"
                                   value={formData.title} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Image
                            </Label>
                            <div className="col-span-3">
                                {
                                    uploadImage ? (
                                            <Image src={uploadImage} alt="Event Image" width={100} height={100}/>)
                                        :
                                        <UploadButton

                                            endpoint="imageUploader"

                                            onClientUploadComplete={(res) => {
                                                res && res[0].url && setUploadImage(res[0].url)
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                console.log(error)
                                            }}
                                        />
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="event_date" className="text-right">
                                Date
                            </Label>
                            <Input required type="date" id="event_date" className="col-span-3"
                                   value={formData.event_date} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start_time" className="text-right">
                                Start Time
                            </Label>
                            <Input required type="time" id="start_time" className="col-span-3"
                                   value={formData.start_time} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="end_time" className="text-right">
                                End Time
                            </Label>
                            <Input required type="time" id="end_time" className="col-span-3" value={formData.end_time}
                                   onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="venue" className="text-right">
                                Venue
                            </Label>
                            <Input required id="venue" placeholder="Venue Name" className="col-span-3"
                                   value={formData.venue} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="organizer" className="text-right">
                                Organizer
                            </Label>
                            <Input required id="organizer" placeholder="Organizer Name" className="col-span-3"
                                   value={formData.organizer} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <select id="category" className="col-span-3" onChange={handleInputChange}>
                                <option value="official">Official</option>
                                <option value="club">Club</option>
                                <option value="other">Other</option>
                            </select>

                            {/*<Input required id="category" placeholder="Event Category" className="col-span-3"*/}
                            {/*       value={formData.category} onChange={handleInputChange}/>*/}
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea id="description" rows={3} placeholder="Event Description" className="col-span-3"
                                      value={formData.description} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="registration_link" className="text-right">
                                Registration Link
                            </Label>
                            <Input id="registration_link" placeholder="http://example.com" className="col-span-3"
                                   value={formData.registration_link} onChange={handleInputChange}/>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Link href={"/events/manage"}>
                <Button variant="outline" size="icon"><GearIcon/></Button>
            </Link>
        </div>
    );
};

export default EventsAddAndManage;
