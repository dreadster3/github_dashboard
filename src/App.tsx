import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './routes/AppRoutes';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import { DATA_STALE_TIME } from './constants';

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: DATA_STALE_TIME,
                cacheTime: DATA_STALE_TIME * 2,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
                <AppRoutes />
            </AuthenticationProvider>
        </QueryClientProvider>
    );
}

export default App;
