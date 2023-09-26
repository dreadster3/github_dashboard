'use client';

import Title from '@/components/Title';
import { useSideNavigation } from '@/providers/SideNavProvider';
import { Option, Select, Typography } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SettingsSection from './settings_section';
import ThemeInput from './theme_input';

function Page() {
    const { set_menu_items } = useSideNavigation();
    const { data: session } = useSession();
    const [language, set_language] = useState('en');

    useEffect(() => {
        set_menu_items(<></>);
    }, [set_menu_items]);

    return (
        <div className="w-full">
            <Title>Settings</Title>
            <div className="flex flex-col gap-4">
                <SettingsSection className="gap-4">
                    <Image
                        src={session?.user?.image ?? ''}
                        className="rounded-full"
                        alt="Profile Picture"
                        width={100}
                        height={100}
                    />
                    <div>
                        <Typography variant="h3" className="text-ctp-text">
                            {session?.user?.name ?? ''}
                        </Typography>
                        <Typography variant="h6" className="text-ctp-text">
                            {session?.user?.email ?? ''}
                        </Typography>
                    </div>
                </SettingsSection>
                <SettingsSection title="Language">
                    <Select
                        label={'Language'}
                        value={language}
                        onChange={(value) => set_language(value ?? '')}
                        disabled={true}
                    >
                        <Option value="en">English</Option>
                        <Option value="pt">Portuguese</Option>
                    </Select>
                </SettingsSection>
                <SettingsSection title="Theme">
                    <ThemeInput />
                </SettingsSection>
            </div>
        </div>
    );
}

export default Page;
