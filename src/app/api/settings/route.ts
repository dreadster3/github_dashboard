import {
    create_settings_async,
    get_settings_by_user_async,
} from '@/db/settings';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { auth_options } from '../auth/[...nextauth]/route';

async function get_handler() {
    const session = await getServerSession(auth_options);

    if (!session) {
        return NextResponse.error();
    }

    const settings = await get_settings_by_user_async(session.user.id);

    return NextResponse.json(settings);
}

async function post_handler(req: NextRequest) {
    const session = await getServerSession(auth_options);

    if (!session) {
        return NextResponse.error();
    }

    const data = await req.json();

    const settings = await create_settings_async(session.user.id, data);

    return NextResponse.json(settings);
}

export { get_handler as GET, post_handler as POST };
