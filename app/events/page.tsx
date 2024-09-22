import Events from "@/components/Events";
import {sql} from "@vercel/postgres";
import {EventType} from "@/lib/types";
import EventsAddAndManage from "@/components/EventsAddAndManage";

const EventsPage = async () => {

    const {rows} = await sql`SELECT * FROM events ORDER BY event_date DESC`
    const events = rows as EventType[]


    return (
        <div className="container flex flex-col h-full p-2 md:p-5 relative">
            <EventsAddAndManage/>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5">Events</h2>

            <Events events={events}/>

        </div>
    );
};

export default EventsPage;
