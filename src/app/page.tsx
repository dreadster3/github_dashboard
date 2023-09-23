'use client';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const { set_menu_items } = useSideNavigation();
    const router = useRouter();

    useEffect(() => {
        set_menu_items(<></>);
    }, [set_menu_items]);

    useEffect(() => {
        router.push('/workflows');
    }, [router]);

    return <>Home Page</>;
}
