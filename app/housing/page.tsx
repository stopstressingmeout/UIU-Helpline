import React from 'react';
import Housing from "@/components/Housing";
import {sql} from "@vercel/postgres";
import { RoomType} from "@/lib/types";

const HousingPage = async() => {
    const {rows} = await sql`SELECT * FROM rooms INNER JOIN users on rooms.creator_id = users.user_id`
    const rooms = rows as RoomType[]
    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Housing</h2>
            <p className="text-xl tracking-tighter sm:text-2xl text-center mb-5">Find the perfect living arrangement for yourself</p>

            <Housing rooms={rooms}/>

        </div>
    );
};

export default HousingPage;
