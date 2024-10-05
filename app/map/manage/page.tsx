import React from 'react';
import {sql} from "@vercel/postgres";
import {currentUser} from "@clerk/nextjs/server";
import {LocationType, UserType} from "@/lib/types";
import {DataTable} from "@/app/map/manage/data-table";
import {columns} from "@/app/map/manage/columns";
import CreateMapLocation from "@/components/CreateMapLocation";

const ManageMap = async () => {
    const user = await currentUser();
    if (!user) return null;

    const data = await sql`SELECT * FROM users WHERE user_id = ${user.id} limit 1`
    const adminData = data.rows as UserType[];

    if (adminData[0].role !== "admin") return null;

    const {rows} = await sql`SELECT * FROM locations ORDER BY created_on DESC`
    const locations = rows as LocationType[]


    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">Manage
                Locations</h2>

            <CreateMapLocation/>
            <DataTable columns={columns} data={locations}/>

        </div>
    );
}


export default ManageMap;
