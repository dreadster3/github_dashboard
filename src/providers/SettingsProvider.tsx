'use client';

import useGetSettings from '@/hooks/useGetSettings';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ISettings } from '@/models/Settings';
import { createContext, useContext, useEffect, useState } from 'react';

interface ISettingsContext {
    settings?: ISettings | undefined;
    set_settings: (settings: ISettings | undefined) => void;
}

const settings_context = createContext<ISettingsContext>({
    settings: {
        theme: 'ctp-mocha',
        language: 'en',
    },
    set_settings: (settings: ISettings | undefined) => {},
});

export const useSettings = () => {
    return useContext(settings_context);
};

function SettingsProvider({ children }: { children: React.ReactNode }) {
    const { data } = useGetSettings();
    const [get_storage_settings, set_storage_settings] =
        useLocalStorage('settings');
    const [settings, set_settings] = useState(data);

    useEffect(() => {
        set_settings(data);
        set_storage_settings(JSON.stringify(data));
    }, [data]);

    return (
        <settings_context.Provider
            value={{
                settings,
                set_settings,
            }}
        >
            {children}
        </settings_context.Provider>
    );
}

export default SettingsProvider;
