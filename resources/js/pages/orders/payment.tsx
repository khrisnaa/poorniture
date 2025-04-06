import ClientLayout from '@/layouts/client-layout';
import { Order, OrderItem, Product } from '@/types/model';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface PageProps {
    order: Order & { items: (OrderItem & { product: Product })[] };
    clientKey: string;
}
export default function Payment({ order, clientKey }: PageProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [snapReady, setSnapReady] = useState(false);

    useEffect(() => {
        // Check if snap_token exists
        if (!order.snap_token) {
            setError('Payment token is not available. Please try again.');
            return;
        }

        // Check if Snap.js is already loaded
        if (window.snap) {
            setSnapReady(true);
            return;
        }

        // Load Midtrans script
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', clientKey);
        script.async = true;
        script.onload = () => {
            console.log('Midtrans script loaded');
            setSnapReady(true);
        };
        script.onerror = () => {
            setError('Failed to load payment gateway. Please refresh the page.');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [clientKey, order.snap_token]);

    const handlePayment = () => {
        if (!paymentMethod) {
            setError('Please select a payment method');
            return;
        }

        if (!snapReady) {
            setError('Payment gateway is initializing. Please wait...');
            return;
        }

        if (!order.snap_token) {
            setError('Payment token is not available. Please try again.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        window.snap.pay(order.snap_token, {
            onSuccess: (result: any) => {
                console.log('Payment success', result);
                router.visit(`/orders/${order.id}`);
            },
            onPending: (result: any) => {
                console.log('Payment pending', result);
                router.visit(`/orders/${order.id}`);
            },
            onError: (error: any) => {
                console.error('Payment error', error);
                setError('Payment failed. Please try again.');
                setIsProcessing(false);
            },
            onClose: () => {
                console.log('Payment closed');
                setIsProcessing(false);
            },
        });
    };

    return (
        <ClientLayout>
            <Head title={`Payment for Order #${order.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h2 className="mb-6 text-2xl font-bold">Payment for Order #{order.id}</h2>

                        <div className="mb-8">
                            <h3 className="mb-4 text-lg font-medium">Order Summary</h3>
                            <div className="rounded-lg border p-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between border-b py-2 last:border-b-0">
                                        <div>
                                            <p>{item.product.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.quantity} x{' '}
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                }).format(item.product.price)}
                                            </p>
                                        </div>
                                        <div>
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            }).format(item.subtotal)}
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 flex justify-between border-t pt-4 font-bold">
                                    <span>Total</span>
                                    <span>
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                        }).format(order.total_price)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="mb-4 text-lg font-medium">Select Payment Method</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('credit_card')}
                                    className={`rounded-lg border p-4 text-center ${paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                >
                                    <div className="flex flex-col items-center">
                                        <svg className="mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                            />
                                        </svg>
                                        <span>Credit/Debit Card</span>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('bank_transfer')}
                                    className={`rounded-lg border p-4 text-center ${paymentMethod === 'bank_transfer' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                >
                                    <div className="flex flex-col items-center">
                                        <svg className="mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                            />
                                        </svg>
                                        <span>Bank Transfer</span>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('gopay')}
                                    className={`rounded-lg border p-4 text-center ${paymentMethod === 'gopay' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                >
                                    <div className="flex flex-col items-center">
                                        <svg className="mb-2 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>GoPay</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {error && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{error}</div>}

                        <div className="flex justify-between">
                            <Link href={`/orders/${order.id}`} className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
                                Back to Order
                            </Link>
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing || !paymentMethod}
                                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                            >
                                {isProcessing ? 'Processing...' : 'Pay Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
