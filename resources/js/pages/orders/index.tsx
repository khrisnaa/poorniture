import ClientLayout from '@/layouts/client-layout';
import { Order, OrderItem, Product } from '@/types/model';
import { Head } from '@inertiajs/react';

interface PageProps {
    orders: (Order & {
        items: (OrderItem & {
            product: Product;
        })[];
    })[];
}

export default function Index({ orders }: PageProps) {
    return (
        <ClientLayout>
            <Head title="Home" />
            <p>Orders</p>
            {orders.map((order, i) => (
                <div className="border-primary my-8 border py-8">
                    {order.items.map((item, i) => (
                        <div className="flex">
                            <p>{item.product.name}</p>
                            <p>{item.quantity}</p>
                            <p>{item.subtotal}</p>
                        </div>
                    ))}
                </div>
            ))}
        </ClientLayout>
    );
}
