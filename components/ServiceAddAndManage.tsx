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
import { createService} from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import {UploadButton} from "@/lib/utils";


const ServiceAddAndManage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [uploadImage, setUploadImage] = useState<undefined | string>(undefined)

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: 0,
        type: 'food' as "food" | "tutoring" | "other",
        description: '',
        phone_number: '',
        social_url_1: '',
        social_url_2: '',
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createService({...formData,image_url:uploadImage ?? ""}).then(() => {
            setFormData({
                title: '',
                location: '',
                price: 0,
                type: 'food' as "food" | "tutoring" | "other",
                description: '',
                phone_number: '',
                social_url_1: '',
                social_url_2: '',
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
                        <DialogTitle>Add New Service</DialogTitle>
                        <DialogDescription>
                            Create a new service by filling in the details.
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

                        {/* Location */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Input required id="location" placeholder="Location" className="col-span-3"
                                   value={formData.location} onChange={handleInputChange}/>
                        </div>


                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Service Type
                            </Label>
                            <select required id="type" value={formData.type} onChange={handleInputChange}
                                    className="col-span-3">
                                <option value="food">Food</option>
                                <option value="tutoring">Tutoring</option>
                                <option value="other">Other Services</option>
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

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input id="price" type="number" min={0} placeholder="Price"
                                   className="col-span-3"
                                   value={formData.price} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="social_url_1" className="text-right">
                                Social Media Link 1
                            </Label>
                            <Input id="social_url_1" placeholder="https://facebook.com/profile"
                                   className="col-span-3"
                                   value={formData.social_url_1} onChange={handleInputChange}/>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="social_url_2" className="text-right">
                                Social Media Link 2
                            </Label>
                            <Input id="social_url_2" placeholder="https://instagram.com/profile"
                                   className="col-span-3"
                                   value={formData.social_url_2} onChange={handleInputChange}/>
                        </div>


                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Link href={"/services/manage"}>
                <Button variant="outline" size="icon"><GearIcon/></Button>
            </Link>
        </div>
    );
};

export default ServiceAddAndManage;
