import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export const auth_options: NextAuthOptions = {
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token = Object.assign({}, token, {
                    access_token: account.access_token,
                });
            }
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session = Object.assign({}, session, {
                    access_token: token.access_token,
                });
            }
            return session;
        },
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    scope: 'workflow repo',
                },
            },
        }),
    ],
};

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
