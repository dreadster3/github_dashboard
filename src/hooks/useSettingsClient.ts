import SettingsClient from '@/clients/settings_client';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

function useSettingsClient(): SettingsClient {
    return new SettingsClient(instance);
}

export default useSettingsClient;
