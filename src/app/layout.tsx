import BreadCrumbNavigation from '@/components/BreadCrumbNavigation';
import SideNav from '@/components/SideNav';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Git Dashing',
    description: 'Dashboard for your GitHub workflows',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={clsx('bg-ctp-base', inter.className)}>
                <Providers>
                    <div className="flex min-h-screen bg-ctp-base">
                        <div className="flex flex-row w-full">
                            <SideNav />
                            <div className="flex justify-center p-8 w-full h-full">
                                <div className="flex flex-col sm:w-full xl:w-2/3">
                                    <div className="pb-7">
                                        <BreadCrumbNavigation />
                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
