import axios from 'axios';
import { useAuth } from '../providers/AuthenticationProvider';
import GithubClient from '../clients/github_client';

const instance = axios.create({
    baseURL: 'https://api.github.com',
});

function useGithubClient() {
    const { token } = useAuth();

    if (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common.Authorization;
    }

    return new GithubClient(instance);
}

export default useGithubClient;
