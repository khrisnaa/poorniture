import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ClientLayout from '@/layouts/client-layout';
import { calculateTotal, formatPrice } from '@/lib/utils';
import { Order, OrderItem, Product } from '@/types/model';
import { Head, router } from '@inertiajs/react';

interface PageProps {
    orders: (Order & {
        items: (OrderItem & {
            product: Product;
        })[];
    })[];
}
export default function Index({ orders }: PageProps) {
    const detail = (id: string) => {
        router.get(
            route('orders.show', id),
            {},
            {
                preserveScroll: true,
            },
        );
    };
    return (
        <ClientLayout>
            <Head title="Orders" />

            <div className="py-8">
                <h1 className="text-5xl font-bold">Your Orders</h1>
            </div>
            <div className="grid grid-cols-1 gap-4 space-y-6 xl:grid-cols-2">
                {orders.length !== 0 ? (
                    orders.map((order) => {
                        const shipping = 1000000;
                        const { subtotal, tax, total } = calculateTotal(order.items);
                        return (
                            <div className="font-inter relative col-span-1">
                                <div className="bg-muted space-y-4 rounded-lg p-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-base font-bold">Order {order.id}</h2>
                                        <Badge className="rounded-md px-4 py-2 capitalize">{order.status}</Badge>
                                    </div>
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
                                        <Button onClick={() => detail(order.id)} className="w-full">
                                            View Detail
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="px-3 text-center text-gray-600">
                        Oops! Looks like you don’t have any orders yet. Start shopping and your orders will appear here.
                    </p>
                )}
            </div>
        </ClientLayout>
    );
}
