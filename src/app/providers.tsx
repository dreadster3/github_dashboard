'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

interface IProvidersProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

function Providers({ children }: IProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
    );
}

export default Providers;
