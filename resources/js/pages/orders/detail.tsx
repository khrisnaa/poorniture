import ClientLayout from '@/layouts/client-layout';
import { Order, OrderItem, Product } from '@/types/model';
import { Head } from '@inertiajs/react';

interface PageProps {
    order: Order & { items: (OrderItem & { product: Product })[] };
}
export default function Index({ order }: PageProps) {
    return (
        <ClientLayout>
            <Head title="Home" />
            <p>Order</p>
            {order.items.map((item, i) => (
                <div className="flex gap-4">
                    <p>{item.product.name}</p>
                    <p>{item.quantity}</p>
                    <p>{item.quantity * item.product.price}</p>
                </div>
            ))}
            <p>{order.total_price}</p>
        </ClientLayout>
    );
}
