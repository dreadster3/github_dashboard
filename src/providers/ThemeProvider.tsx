'use client';

import { SYSTEM_DEFAULT_DARK } from '@/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, useContext, useEffect, useState } from 'react';

const theme_context = createContext({
    theme: 'ctp-mocha',
    set_theme: (theme: string) => {},
});

export const useTheme = () => {
    return useContext(theme_context);
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [get_storage_theme, set_storage_theme] = useLocalStorage('theme');
    const [theme, set_theme] = useState(get_storage_theme() ?? 'default');

    const handle_set_theme = (theme: string) => {
        if (theme === 'default') {
            set_storage_theme(undefined);
            set_theme('default');
            return;
        }

        set_theme(theme);
        set_storage_theme(theme);
    };

    useEffect(() => {
        window
            .matchMedia(SYSTEM_DEFAULT_DARK)
            .addEventListener('change', (event) => {
                const colorScheme = event.matches ? 'dark' : 'light';

                if (get_storage_theme() !== null) {
                    return;
                }

                if (colorScheme === 'dark') {
                    set_theme('ctp-mocha');
                } else {
                    set_theme('ctp-latte');
                }
            });
    }, [set_theme, get_storage_theme]);

    useEffect(() => {
        if (theme === 'default') {
            if (window.matchMedia(SYSTEM_DEFAULT_DARK).matches) {
                set_theme('ctp-mocha');
            } else {
                set_theme('ctp-latte');
            }

            return;
        }

        document.documentElement.className = theme;
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
