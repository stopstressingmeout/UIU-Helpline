import React from 'react';
import {sql} from "@vercel/postgres";
import {ServiceType} from "@/lib/types";
import Services from "@/components/Services";
import ServiceAddAndManage from "@/components/ServiceAddAndManage";

const ServicesPage = async () => {
    const {rows} = await sql`SELECT * FROM services INNER JOIN users on services.creator_id = users.user_id`
    const services = rows as ServiceType[]
    console.log(services)
    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <ServiceAddAndManage/>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Services</h2>
            <p className="text-xl tracking-tighter sm:text-2xl text-center mb-5">Find services provided by the
                students</p>

            <Services services={services}/>
        </div>
    );
};

export default ServicesPage;
