'use client';

import { query_client_options } from '@/constants';
import theme from '@/constants/theme';
import { SideNavProvider } from '@/providers/SideNavProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { ThemeProvider as MThemeProvider } from '@material-tailwind/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface IProvidersProps {
    children: React.ReactNode;
}

function Providers({ children }: IProvidersProps) {
    const [queryClient] = React.useState(
        () => new QueryClient(query_client_options),
    );

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <MThemeProvider value={theme}>
                    <SideNavProvider>
                        <SessionProvider>{children}</SessionProvider>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </SideNavProvider>
                </MThemeProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default Providers;
