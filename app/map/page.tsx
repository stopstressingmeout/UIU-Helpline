'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {useEffect} from "react";


type Location ={
    id: number
    name: string
    type: 'hospital' | 'restaurant' | 'hostel' | 'apartment' | 'recreation' | 'shopping'
    position: [number, number]
}

const locations: Location[] = [
    { id: 1, name: 'Shopping 1', type: 'shopping', position: [23.80204819081027, 90.45160677398712] },
    { id: 2, name: 'Hostel 2', type: 'hostel', position: [23.799577338819613, 90.45793059633921] },
    { id: 3, name: 'Apartment 3', type: 'apartment', position: [23.798298103437, 90.44121662263655] },
    { id: 4, name: 'Restuarant 4', type: 'restaurant', position: [23.80766303313623, 90.45755113402664] },
    { id: 5, name: 'Apartment 5', type: 'apartment', position: [23.80747003363949, 90.44384322493825] },
    { id: 6, name: 'Apartment 6', type: 'apartment', position: [23.807740308724266, 90.45498215542707] },
    { id: 7, name: 'Recreation 7', type: 'recreation', position: [23.794410923371668, 90.44591059720001] },
    { id: 8, name: 'Shopping 8', type: 'shopping', position: [23.79005147117266, 90.44295259553026] },
    { id: 9, name: 'Hospital 9', type: 'hospital', position: [23.802047375172215, 90.45004175424044] },
    { id: 10, name: 'Shopping 10', type: 'shopping', position: [23.791916641970808, 90.45238738743159] }
]

const MapPage = () => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Fix for Leaflet icons not displaying
            delete (L.Icon.Default.prototype as any)._getIconUrl
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: '/marker-icon-2x.png',
                iconUrl: '/marker-icon.png',
                shadowUrl: '/marker-shadow.png',
            })
        }
    }, [])

    const getMarkerColor = (type: Location['type']) => {
        switch (type) {
            case 'hospital':
                return 'red';
            case 'restaurant':
                return 'green';
            case 'hostel':
                return 'blue';
            case 'shopping':
                return 'orange';
            case 'apartment':
                return 'violet';
            case 'recreation':
                return 'yellow';
            default:
                return 'gray';
        }
    };


    const createCustomIcon = (type: Location['type']) => {
        return new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getMarkerColor(
                type
            )}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        })
    }
    return (
        <div className="container flex flex-col h-screen my-5">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">Map</h2>
            <div className="flex-grow relative p-5">
                <MapContainer

                    scrollWheelZoom={false}
                    center={[23.79807921073996, 90.44974218159861]}
                    zoom={16}
                    style={{height: '100%', width: '100%',zIndex:2}}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[23.79807921073996, 90.44974218159861]} icon={new L.Icon({
                        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png`,
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [35, 51],
                        iconAnchor: [22, 51],
                        popupAnchor: [1, -34],
                        shadowSize: [51, 51],
                    })}>
                        <Popup>
                            United International University
                        </Popup>
                    </Marker>
                    {locations.map((location) => (
                        <Marker key={location.id} position={location.position} icon={createCustomIcon(location.type)}>
                            <Popup>{location.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow z-[5]">
                    <h3 className="font-bold mb-2">Legend</h3>

                    <div className="flex items-center mb-1">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span>Hospitals</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span>Restaurants</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span>Hostels</span>
                    </div>

                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-amber-600 rounded-full mr-2"></div>
                        <span>Shopping</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                        <span>Apartments</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Recreation</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MapPage;



