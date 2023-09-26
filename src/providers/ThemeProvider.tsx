'use client';

import { SYSTEM_DEFAULT_DARK } from '@/constants';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSettings } from './SettingsProvider';

const theme_context = createContext({
    theme: 'ctp-mocha',
    set_theme: (theme: string) => {},
});

export const useTheme = () => {
    return useContext(theme_context);
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { settings, set_settings } = useSettings();
    const [theme, set_theme] = useState(settings?.theme ?? 'default');

    const handle_set_theme = (theme: string) => {
        set_settings({
            theme,
            language: settings?.language ?? 'en',
        });

        set_theme(theme);
    };

    useEffect(() => {
        set_theme(settings?.theme ?? 'default');
    }, [settings?.theme]);

    useEffect(() => {
        window
            .matchMedia(SYSTEM_DEFAULT_DARK)
            .addEventListener('change', (event) => {
                const colorScheme = event.matches ? 'dark' : 'light';

                if (theme !== 'default') {
                    return;
                }

                if (colorScheme === 'dark') {
                    document.documentElement.className = 'ctp-mocha';
                } else {
                    document.documentElement.className = 'ctp-latte';
                }
            });
    }, [theme]);

    useEffect(() => {
        let local_theme = theme;

        if (theme === 'default') {
            if (window.matchMedia(SYSTEM_DEFAULT_DARK).matches) {
                local_theme = 'mocha';
            } else {
                local_theme = 'latte';
            }
        }

        document.documentElement.className = `ctp-${local_theme}`;
    }, [theme]);

    return (
        <theme_context.Provider
            value={{
                theme,
                set_theme: handle_set_theme,
            }}
        >
            {children}
        </theme_context.Provider>
    );
}

export default ThemeProvider;
