'use client';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {LocationType} from "@/lib/types";
import Link from "next/link";


const Map = ({locations}: { locations: LocationType[] }) => {

    console.log(locations)

    const getMarkerColor = (type: LocationType['location_type']) => {
        switch (type) {
            case 'hospital':
                return 'red';
            case 'restaurant':
                return 'green';
            case 'shopping':
                return 'yellow';
            case 'accommodation':
                return 'violet';
            case 'recreation':
                return 'blue';
            default:
                return 'grey';
        }
    };


    const createCustomIcon = (type: LocationType['location_type']) => {
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
        <div className="flex-grow relative py-5">
            <MapContainer
                scrollWheelZoom={false}
                center={[23.79807921073996, 90.44974218159861]}
                zoom={16}
                style={{height: '100%', width: '100%', zIndex: 2}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location) => (
                    <Marker key={location.location_id} position={[location.latitude, location.longitude]}
                            icon={createCustomIcon(location.location_type)}>
                        <Popup>
                            <h1 className="font-bold">{location.name}</h1>
                            <p>{location.address}</p>
                            <p>{location.description}</p>
                            {
                                location.phone_number && <div><a href={`tel:${
                                    location.phone_number
                                }`}>
                                    {location.phone_number}
                                </a></div>
                            }
                            {
                                location.page_link && <div>

                                    <Link
                                        className={"text-blue-500 my-2 text-sm font-bold hover:underline"}
                                        href={location.page_link}>
                                        Visit Page
                                    </Link>
                                </div>
                            }
                            {
                                location.map_link && <div><Link
                                    className={"text-blue-500 my-2 text-sm font-bold hover:underline"}
                                    href={location.map_link}>
                                    View on Google Maps
                                </Link></div>
                            }

                        </Popup>
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
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
                    <span>Shopping</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                    <span>Accommodation</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span>Recreation</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
                    <span>Others</span>
                </div>

            </div>
        </div>
    );
};

export default Map;



