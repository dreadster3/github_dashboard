'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, useEffect, useState } from 'react';

const theme_context = createContext({
    theme: 'ctp-mocha',
    set_theme: (theme: string) => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [get_storage_theme, set_storage_theme] = useLocalStorage('theme');
    const [theme, set_theme] = useState(get_storage_theme() ?? 'ctp-mocha');

    const handle_set_theme = (theme: string) => {
        set_theme(theme);
        set_storage_theme(theme);
    };

    useEffect(() => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
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
