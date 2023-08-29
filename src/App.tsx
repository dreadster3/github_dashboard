import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DATA_STALE_TIME } from './constants';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: DATA_STALE_TIME,
            cacheTime: DATA_STALE_TIME * 2,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
                <AppRoutes />
            </AuthenticationProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}

export default App;
