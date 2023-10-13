import SettingsClient from '@/clients/settings_client';
import axios from 'axios';

const get_origin = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXTAUTH_URL;
    }

    return window.location.origin;
};

const instance = axios.create({
    baseURL: `${get_origin()}/api`,
});

function useSettingsClient(): SettingsClient {
    return new SettingsClient(instance);
}

export default useSettingsClient;
