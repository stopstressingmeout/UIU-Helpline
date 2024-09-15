import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const {rows } = await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;

    console.log(request,rows);
    return NextResponse.json({ rows });
}

