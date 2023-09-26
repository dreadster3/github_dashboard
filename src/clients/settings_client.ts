import { ISettings, Settings } from '@/models/Settings';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class SettingsClient {
    private readonly axiosInstance: AxiosInstance;

    constructor(instance?: AxiosInstance) {
        this.axiosInstance = instance ?? axios.create();
    }

    async get_settings_async(): Promise<ISettings> {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: '/settings',
        };

        const response = await this.axiosInstance.request(options);

        return new Settings(response.data);
    }
}

export default SettingsClient;
