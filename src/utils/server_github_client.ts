import { auth_options } from '@/app/api/auth/[...nextauth]/route';
import GithubClient from '@/clients/github_client';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export default async function get_server_github_client() {
    const session = await getServerSession(auth_options);

    const axios_instance = axios.create({
        baseURL: 'https://api.github.com',
    });

    if (session?.access_token) {
        axios_instance.defaults.headers.common.Authorization = `Bearer ${session.access_token}`;
    } else {
        delete axios_instance.defaults.headers.common.Authorization;
    }

    return new GithubClient(axios_instance);
}
