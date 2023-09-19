'use client';
import { signOut } from 'next-auth/react';

export default function Home() {
    return (
        <main className="bg-ctp-base flex min-h-screen flex-col items-center justify-between p-24">
            <button className="text-ctp-text" onClick={() => signOut()}>
                SignOut
            </button>
        </main>
    );
}
