import { create_settings_async } from '@/db/settings';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';

const prism_adapter = PrismaAdapter(prisma);

export const auth_options: NextAuthOptions = {
    adapter: {
        ...prism_adapter,
        createUser: async (user) => {
            const created_user = await prism_adapter.createUser!(user);

            // Create default settings for the user
            await create_settings_async(created_user.id);

            return created_user;
        },
    },
    secret: process.env.NEXTAUTH_SECRET ?? '',
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token = Object.assign({}, token, {
                    access_token: account.access_token,
                });
            }

            if (profile) {
                // WARN: Works since we only have one provider
                const github_profile = profile as GithubProfile;
                token = Object.assign({}, token, {
                    username: github_profile.login,
                });
            }

            return token;
        },
        async session({ session, token }) {
            if (session) {
                session = Object.assign({}, session, {
                    access_token: token.access_token,
                    user: {
                        ...session.user,
                        id: token.sub,
                        username: token.username ?? '',
                    },
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
                    scope: 'workflow repo read:org',
                },
            },
        }),
    ],
};

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
