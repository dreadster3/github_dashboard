import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from './routes/AppRoutes';
import { AuthenticationProvider } from './providers/AuthenticationProvider';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
                <AppRoutes />
            </AuthenticationProvider>
        </QueryClientProvider>
    );
}

export default App;
