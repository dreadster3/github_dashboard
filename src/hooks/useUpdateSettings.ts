import { ISettings } from '@/models/Settings';
import { useMutation } from '@tanstack/react-query';
import useSettingsClient from './useSettingsClient';

function useUpdateSettings() {
    const client = useSettingsClient();

    const { mutate } = useMutation(['settings'], (settings: ISettings) =>
        client.update_settings_async(settings),
    );

    return { mutate };
}

export default useUpdateSettings;
