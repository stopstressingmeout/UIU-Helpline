import {Webhook} from 'svix'
import {headers} from 'next/headers'
import {UserJSON, WebhookEvent} from '@clerk/nextjs/server'
import {sql} from "@vercel/postgres";
import {NextResponse} from "next/server";

type PayloadType = {
    data: UserJSON
    type: "user.created" | "user.updated" | "user.deleted"
    object: "event"
}

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    // Get the body
    const payload: PayloadType = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const {id} = evt.data
    const eventType = evt.type
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    // console.log('Webhook body:', body)

    if (eventType === 'user.created') {
        try {
            await sql`INSERT INTO users (user_id,first_name,last_name,role) VALUES (${payload.data.id}, ${payload.data.first_name}, ${payload.data.last_name},"user");`;
            console.log('User created')
            console.log(payload.data)
            return NextResponse.json({message: 'User created'}, {status: 200})
        } catch (error) {
            return NextResponse.json({error}, {status: 500});
        }
    }

    return NextResponse.json({message: 'Webhook received'}, {status: 200})
}