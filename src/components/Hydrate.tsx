'use client';

import { HydrateProps, Hydrate as RQHydrate } from '@tanstack/react-query';

interface IHydrateProps {
    state: string;
    children: React.ReactNode;
    options?: HydrateProps['options'];
}

function Hydrate({ state, ...props }: IHydrateProps) {
    return <RQHydrate state={JSON.parse(state)} {...props} />;
}

export default Hydrate;
