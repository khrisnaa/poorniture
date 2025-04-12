import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useSnapLoader } from '@/hooks/use-snaploader';
import ClientLayout from '@/layouts/client-layout';
import { calculateTotal, formatPrice } from '@/lib/utils';
import { SharedData } from '@/types';
import { Order, OrderItem, Product } from '@/types/model';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
interface PageProps {
    order: Order & { items: (OrderItem & { product: Product })[] };
    clientKey: string;
}

type ProfileForm = {
    name: string;
    email: string;
    phone?: string;
};

export default function Payment({ order, clientKey }: PageProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const shipping = 1000000;
    const { subtotal, tax, total } = calculateTotal(order.items);
    const [address, setAddress] = useState(order.address ?? '');
    const [errors, setErrors] = useState('');

    const { snapReady, error, setError } = useSnapLoader(clientKey, order.snap_token as string);

    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        if (!address) {
            return setErrors('Address is required.');
        }
        if (!snapReady) return setError('Payment gateway is initializing. Please wait...');
        if (!order.snap_token) return setError('Payment token is not available. Please try again.');

        setIsProcessing(true);
        setError(null);

        try {
            await window.axios.put(route('orders.update', order.id), {
                address,
            });

            window.snap.pay(order.snap_token, {
                onSuccess: () => router.visit(`/orders/${order.id}`),
                onPending: () => router.visit(`/orders/${order.id}`),
                onError: () => {
                    setError('Payment failed. Please try again.');
                    setIsProcessing(false);
                },
                onClose: () => setIsProcessing(false),
            });
        } catch (error) {
            console.log(error);
            setError('Failed to update address. Please try again.');
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (error) {
            toast(error);
        }
    }, [error]);

    return (
        <ClientLayout>
            <Head title="Checkout" />
            <div className="font-inter">
                <div className="px-3 py-8 md:py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <div>
                                <h1 className="mb-2 text-2xl font-bold">Checkout</h1>
                                <p className="text-muted-foreground">Review your order and complete the checkout process.</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input className="disabled:cursor-default disabled:opacity-80" disabled id="name" value={auth.user.name} />
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            className="disabled:cursor-default disabled:opacity-80"
                                            disabled
                                            id="email"
                                            type="email"
                                            value={auth.user.email}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            className="disabled:cursor-default disabled:opacity-80"
                                            disabled
                                            id="phone"
                                            type="text"
                                            value={auth.user.phone}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        rows={3}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="123 Main St, Anytown USA"
                                    />
                                    {errors && <div className="text-sm text-red-500">{errors}</div>}
                                </div>
                                {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="card-number">Card Number</Label>
                                        <Input id="card-number" type="text" placeholder="4111 1111 1111 1111" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="expiry-date">Expiry Date</Label>
                                            <Input id="expiry-date" type="text" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" type="text" placeholder="123" />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="flex justify-end">
                                    <Button disabled={isProcessing} onClick={handlePayment} type="button">
                                        Pay Order
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-muted space-y-4 rounded-lg p-6">
                            <h2 className="text-xl font-bold">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold">Items in Cart</h3>
                                {order.items.map((item) => (
                                    <ItemDetail key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}

interface ItemDetailProps {
    item: OrderItem & { product: Product };
}
function ItemDetail({ item }: ItemDetailProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {item.product.thumbnail ? (
                    <img
                        src={`/storage/${item.product.thumbnail}`}
                        alt="Product Image"
                        width={64}
                        height={64}
                        className="rounded-md"
                        style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                    />
                ) : (
                    <div className="h-full w-full">
                        <AppLogoIcon className="h-full w-full text-neutral-400" />
                    </div>
                )}

                <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                </div>
            </div>
            <span className="font-medium">{formatPrice(item.subtotal)}</span>
        </div>
    );
}
