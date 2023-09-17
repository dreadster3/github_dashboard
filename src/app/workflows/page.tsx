'use client';
import { signOut, useSession } from 'next-auth/react';

function Workflows() {
    const { data: session } = useSession();

    const workflows = fetch(
        'https://api.github.com/repos/dreadster3/test-markdown/actions/workflows',
        {
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        },
    ).then((response) => response.json());

    console.log(workflows);

    return (
        <div>
            <button onClick={() => signOut()}>SignOut</button>Workflows
        </div>
    );
}

export default Workflows;
