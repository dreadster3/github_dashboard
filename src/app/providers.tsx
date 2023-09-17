'use client';

import { query_client_options } from '@/constants';
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
        <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default Providers;
