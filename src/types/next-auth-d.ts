import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        access_token: string;
        user: {
            id: string;
            username: string;
            image: string;
            name: string;
            email: string;
        };
    }
}
