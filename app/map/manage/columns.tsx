"use client"

import { ColumnDef } from "@tanstack/react-table"
import {LocationType} from "@/lib/types";
import Link from "next/link";
import {ArrowUpDown, LinkIcon, Map, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {deleteLocation} from "@/lib/actions";

const handleDelete = async (location_id:number) => {
    await deleteLocation(location_id);
}

export const columns: ColumnDef<LocationType>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "latitude",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Latitude
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "longitude",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Longitude
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "map_link",
        header: () => <div>Map</div>,
        cell: ({row}) => {

            if(!row.getValue("map_link")) return null

            return <Link href={row.getValue("map_link")}>
                <Map className="mr-2 h-4 w-4"/>
            </Link>
        },
    },
    {
        accessorKey: "phone_number",
        header: "Phone",
    },
    {
        accessorKey: "page_link",
        header: () => <div>Link</div>,
        cell: ({row}) => {
            if(!row.getValue("page_link")) return null

            return <Link href={row.getValue("page_link")}>
                <LinkIcon className="mr-2 h-4 w-4"/>
            </Link>
        },
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "location_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const location = row.original

            if(!location.location_id) return null

            return (
                <Button className=" p-2 " variant={"destructive"} >
                    <Trash className="h-4 w-4" onClick={() => handleDelete(location.location_id!)}/>
                </Button>
            )
        },
    },
]
