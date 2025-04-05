import { useCart } from '@/context/cart-context';
import { CartItem, Product } from '@/types/model';
import { router } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';

interface ChartSheetProps {
    open: boolean;
    onOpenChange: () => void;
}

export default function CartSheet({ open, onOpenChange }: ChartSheetProps) {
    const { quantity, refreshQuantity } = useCart();

    const [items, setItems] = useState<(CartItem & { product: Product })[]>([]);

    useEffect(() => {
        if (open) {
            window.axios
                .get('/cart/all')
                .then((res) => {
                    setItems(res.data.items || []);
                })
                .catch((err) => {
                    console.error('Failed to fetch cart items:', err);
                });
        }
    }, [open, quantity]);

    const incrementItem = (item: CartItem) => {
        window.axios
            .post(route('cart.store'), {
                product_id: item.product_id,
                quantity: 1,
            })
            .then(() => {
                refreshQuantity();
            })
            .catch((error) => {
                console.error('Gagal menambahkan produk ke keranjang:', error);
            });
    };

    const decrementItem = (item: CartItem) => {
        window.axios
            .post(route('cart.decrement'), {
                product_id: item.product_id,
            })
            .then(() => {
                refreshQuantity();
            })
            .catch((error) => {
                console.error('Gagal mengurangi jumlah produk:', error);
            });
    };

    const checkout = () => {
        router.post(
            route('order.checkout'),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                {items.map((item, i) => (
                    <div>
                        <p>{item.product.name}</p>
                        <p>{item.quantity}</p>
                        <div>
                            <Button onClick={() => decrementItem(item)}>
                                <Minus />
                            </Button>
                            <Button onClick={() => incrementItem(item)}>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                ))}

                <Button onClick={checkout}>Checkout</Button>
            </SheetContent>
        </Sheet>
    );
}
