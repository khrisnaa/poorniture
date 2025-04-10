import { loadSnap } from '@/lib/midtrans';
import { useEffect, useState } from 'react';

export const useSnapLoader = (clientKey: string, snapToken: string) => {
    const [snapReady, setSnapReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cleanup = loadSnap({
            clientKey,
            snapToken,
            onReady: () => setSnapReady(true),
            onError: setError,
        });

        return cleanup;
    }, [clientKey, snapToken]);

    return { snapReady, error, setError };
};
