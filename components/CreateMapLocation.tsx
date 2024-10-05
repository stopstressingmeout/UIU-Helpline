"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea";
import {createLocation} from "@/lib/actions";


const CreateMapLocation = () => {

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        map_link: '',
        description: '',
        latitude: 0,
        longitude: 0,
        phone_number: '',
        page_link: '',
        location_type: 'accommodation' as 'accommodation' | 'hospital' | 'restaurant' | 'shopping' | 'recreation' | 'others'
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createLocation(formData).then(() => {
            setFormData({
                name: '',
                address: '',
                map_link: '',
                description: '',
                phone_number: '',
                latitude: 0,
                longitude: 0,
                page_link: '',
                location_type: 'accommodation'

            })
        });

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: id === 'latitude' || id === 'longitude'
                ? Number(value)
                : value
        }));

        console.log(formData)
    };

    return (

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-4 py-4 border-b mb-5">

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input required id="name" placeholder="Location Name" className="col-span-3"
                       value={formData.name} onChange={handleInputChange}/>
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                    Description
                </Label>
                <Textarea id="description" placeholder="Description" className="col-span-3"
                          value={formData.description} onChange={handleInputChange}/>
            </div>


            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                    Address
                </Label>
                <Input  id="address" placeholder="Address" className="col-span-3"
                       value={formData.address} onChange={handleInputChange}/>
            </div>

            {/* Latitude */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="latitude" className="text-right">
                    Latitude
                </Label>
                <Input required id="latitude" placeholder="Latitude"
                       className="col-span-3"
                       value={formData.latitude} onChange={handleInputChange}/>
            </div>

            {/* Longitude */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="longitude" className="text-right">
                    Longitude
                </Label>
                <Input required id="longitude" placeholder="Longitude"
                       className="col-span-3"
                       value={formData.longitude} onChange={handleInputChange}/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="map_link" className="text-right">
                    Map Link
                </Label>
                <Input id="map_link" placeholder="Map Link" className="col-span-3"
                       value={formData.map_link} onChange={handleInputChange}/>
            </div>


            <div className="grid grid-cols-4 items-center gap-4">
                <Label  htmlFor="location_type" className="text-right">
                    Location Type
                </Label>
                <select required id="location_type" value={formData.location_type} onChange={handleInputChange}
                        className="col-span-3">
                    <option value="accommodation">Accommodation</option>
                    <option value="hospital">Hospital</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="shopping">Shopping</option>
                    <option value="recreation">Recreation</option>
                    <option value="others">Others</option>
                </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone_number" className="text-right">
                    Phone Number
                </Label>
                <Input id="phone_number" placeholder="Phone Number" className="col-span-3"
                       value={formData.phone_number} onChange={handleInputChange}/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="page_link" className="text-right">
                    Page Link
                </Label>
                <Input id="page_link" placeholder="Page Link" className="col-span-3"
                       value={formData.page_link} onChange={handleInputChange}/>
            </div>

            <div className="col-span-1 lg:col-span-2 flex">
                <Button type="submit" className="w-1/2 mx-auto">Create Location</Button>
            </div>

        </form>


    );
};

export default CreateMapLocation;
