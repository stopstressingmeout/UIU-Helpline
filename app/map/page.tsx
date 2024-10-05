import dynamic from "next/dynamic";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {GearIcon} from "@radix-ui/react-icons";
import React from "react";
import {sql} from "@vercel/postgres";
import {LocationType, UserType} from "@/lib/types";
import {currentUser} from "@clerk/nextjs/server";

const MapPage = async () => {
    const {rows} = await sql`SELECT * FROM locations ORDER BY created_on DESC`
    const locations = rows as LocationType[]
    const MyMap = dynamic(() => import("../../components/Map"), { ssr:false })

    const user = await currentUser();
    if (!user) return null;

    const data = await sql`SELECT * FROM users WHERE user_id = ${user.id} limit 1`
    const adminData = data.rows as UserType[];

    if (adminData[0].role !== "admin") return null;
    return (
        <div className="container flex flex-col h-screen p-2 md:p-5 relative">
            {
                adminData[0].role === "admin" && <Link className="absolute top-2 right-2" href={"/map/manage"}>
                    <Button variant="outline" size="icon"><GearIcon/></Button>
                </Link>
            }

            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Map</h2>
            <MyMap locations={locations} />
        </div>
    );
};

export default MapPage;



