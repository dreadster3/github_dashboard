import { QueryClientConfig } from '@tanstack/react-query';

export const REPOSITORY_OWNER = process.env.NEXT_PUBLIC_REPOSITORY_OWNER ?? '';
export const REPOSITORY_NAME = process.env.NEXT_PUBLIC_REPOSITORY_NAME ?? '';

export const SYSTEM_DEFAULT_DARK = '(prefers-color-scheme: dark)';

export const query_client_options: QueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            cacheTime: 1000 * 60 * 2,
        },
    },
};
