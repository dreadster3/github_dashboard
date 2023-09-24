'use client';

import Title from '@/components/Title';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { useEffect } from 'react';

function Page() {
    const { set_menu_items } = useSideNavigation();

    useEffect(() => {
        set_menu_items(<></>);
    }, [set_menu_items]);

    return (
        <div className="w-full">
            <Title>Settings</Title>
            <div>Content</div>
        </div>
    );
}

export default Page;
