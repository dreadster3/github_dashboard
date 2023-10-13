import { auth_options } from '@/app/api/auth/[...nextauth]/route';
import { get_settings_by_user_async } from '@/db/settings';
import get_query_client from '@/utils/query_client';
import { useQuery } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import useSettingsClient from './useSettingsClient';

function useGetSettings() {
    const client = useSettingsClient();

    const { data, isLoading, isError } = useQuery(['settings'], () =>
        client.get_settings_async(),
    );

    return { data, isLoading, isError };
}

export const server_prefetch_settings_async = async () => {
    const session = await getServerSession(auth_options);
    const query_client = get_query_client();

    await query_client.prefetchQuery(['settings'], () =>
        get_settings_by_user_async(session!.user.id),
    );

    return query_client;
};

export default useGetSettings;
