type SnapInitOptions = {
    clientKey: string;
    snapToken: string;
    onReady: () => void;
    onError: (message: string) => void;
};

export const loadSnap = ({ clientKey, snapToken, onReady, onError }: SnapInitOptions) => {
    if (!snapToken) {
        onError('Payment token is not available. Please try again.');
        return;
    }

    if (window.snap) {
        onReady();
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    script.onload = onReady;
    script.onerror = () => onError('Failed to load payment gateway. Please refresh the page.');
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
};
