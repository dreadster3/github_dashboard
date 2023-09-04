import { ThemeProvider } from '@material-tailwind/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DATA_STALE_TIME } from './constants';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import { SideBarNavigationProvider } from './providers/SideBarNavigationProvider';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: DATA_STALE_TIME,
            cacheTime: DATA_STALE_TIME * 2,
        },
    },
});

const theme = {
    iconButton: {
        defaultProps: {
            color: 'blue',
        },
        valid: {
            colors: ['blue'],
        },
        styles: {
            variants: {
                filled: {
                    blue: {
                        background: 'bg-ctp-blue',
                        color: 'text-ctp-base',
                    },
                },
                text: {
                    blue: {
                        color: 'text-ctp-text',
                    },
                },
            },
        },
    },
    button: {
        defaultProps: {
            color: 'blue',
        },
        valid: {
            colors: ['blue'],
        },
        styles: {
            variants: {
                filled: {
                    blue: {
                        background: 'bg-ctp-blue',
                        color: 'text-ctp-base',
                    },
                },
                text: {
                    blue: {
                        color: 'text-ctp-text',
                    },
                },
            },
        },
    },
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider value={theme}>
                <SideBarNavigationProvider>
                    <AuthenticationProvider>
                        <AppRoutes />
                    </AuthenticationProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </SideBarNavigationProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
