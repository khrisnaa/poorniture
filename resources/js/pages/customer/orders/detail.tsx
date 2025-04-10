import BackButton from '@/components/back-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ClientLayout from '@/layouts/client-layout';
import { calculateTotal, formatPrice } from '@/lib/utils';
import { SharedData } from '@/types';
import { Order, OrderItem, Product } from '@/types/model';
import { Head, router, usePage } from '@inertiajs/react';

interface PageProps {
    order: Order & { items: (OrderItem & { product: Product })[] };
}
export default function Detail({ order }: PageProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const shipping = 1000000;
    const { subtotal, tax, total } = calculateTotal(order.items);

    const checkout = () => {
        router.post(
            route('orders.checkout'),
            {},
            {
                preserveScroll: true,
            },
        );
    };
    return (
        <ClientLayout>
            <Head title="Order Details" />
            <BackButton link="orders.index" />
            <div className="font-inter relative">
                <div className="bg-muted space-y-4 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Order Details</h2>
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
                        <h3 className="text-lg font-bold">Order Items</h3>
                        {order.items.map((item) => (
                            <ItemDetail key={item.id} item={item} />
                        ))}
                    </div>
                    {order.status == 'pending' && (
                        <Button onClick={checkout} className="w-full">
                            Pay
                        </Button>
                    )}
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
                <img
                    src={item.product.thumbnail ?? '/asset/black_chair.webp'}
                    alt="Product Image"
                    width={64}
                    height={64}
                    className="rounded-md"
                    style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                />
                <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                </div>
            </div>
            <span className="font-medium">{formatPrice(item.subtotal)}</span>
        </div>
    );
}
