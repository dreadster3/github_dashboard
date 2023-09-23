import axios from 'axios';
import { useSession } from 'next-auth/react';
import GithubClient from '../clients/github_client';

const instance = axios.create({
    baseURL: 'https://api.github.com',
});

function useGithubClient(): GithubClient {
    const { data: session } = useSession();

    if (session?.access_token) {
        instance.defaults.headers.common.Authorization = `Bearer ${session.access_token}`;
    } else {
        delete instance.defaults.headers.common.Authorization;
    }

    return new GithubClient(instance);
}

export default useGithubClient;
