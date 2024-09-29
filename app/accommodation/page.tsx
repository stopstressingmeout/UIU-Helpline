import React from 'react';
import Accommodation from "@/components/Accommodation";
import {sql} from "@vercel/postgres";
import { AccommodationType} from "@/lib/types";
import AccommodationAddAndManage from "@/components/AccommodationAddAndManage";

const AccommodationPage = async() => {
    const {rows} = await sql`SELECT * FROM accommodations INNER JOIN users on accommodations.creator_id = users.user_id`
    const accommodations = rows as AccommodationType[]
    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <AccommodationAddAndManage/>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Accommodations</h2>
            <p className="text-xl tracking-tighter sm:text-2xl text-center mb-5">Find the perfect living arrangement for yourself</p>

            <Accommodation accommodations={accommodations}/>

        </div>
    );
};

export default AccommodationPage;
