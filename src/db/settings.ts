import prisma from '@/lib/prisma';

export const get_settings_by_user_async = (user_id: string) => {
    return prisma.settings.findUnique({
        where: {
            userId: user_id,
        },
    });
};

interface ISettings {
    theme?: string;
    language?: string;
}

export const create_settings_async = (
    user_id: string,
    settings?: ISettings,
) => {
    return prisma.settings.create({
        data: {
            userId: user_id,
            theme: settings?.theme ?? 'default',
            language: settings?.language ?? 'en',
        },
    });
};
