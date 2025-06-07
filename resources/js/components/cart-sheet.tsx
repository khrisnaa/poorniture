import { useCart } from '@/context/cart-context';
import { CartItem, Category, Product } from '@/types/model';
import { router } from '@inertiajs/react';
import { Minus, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogoIcon from './app-logo-icon';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';

interface ChartSheetProps {
    open: boolean;
    onOpenChange: () => void;
}

export default function CartSheet({ open, onOpenChange }: ChartSheetProps) {
    const { quantity, refreshQuantity } = useCart();

    const [items, setItems] = useState<(CartItem & { product: Product & { category: Category } })[]>([]);

    useEffect(() => {
        if (open) {
            window.axios
                .get(route('cart.items'))
                .then((res) => {
                    setItems(res.data.items || []);
                })
                .catch((err) => {
                    console.error('Failed to fetch cart items:', err);
                });
        }
    }, [open, quantity]);

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
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="z-[102]">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                    <SheetDescription>Review the items you’ve added before proceeding to checkout.</SheetDescription>
                </SheetHeader>
                <div className="scrollbar-hidden flex flex-col gap-4 overflow-y-auto p-4">
                    {items.length != 0 ? (
                        items.map((item) => <CartCard key={item.id} quantity={item.quantity} product={item.product} />)
                    ) : (
                        <div className="text-muted-foreground flex h-full flex-col items-center justify-center">
                            <p className="text-sm">Your cart is empty</p>
                        </div>
                    )}
                </div>
                <SheetFooter>
                    <Button disabled={items.length == 0} onClick={checkout}>
                        Checkout
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

interface CartCardProps {
    product: Product & { category: Category };
    quantity: number;
}
const CartCard = ({ product, quantity }: CartCardProps) => {
    const { refreshQuantity } = useCart();

    const updateItem = (action: 'increase' | 'decrease' | 'remove') => {
        window.axios
            .post(route('cart.update'), {
                _method: 'put',
                product_id: product.id,
                action: action,
            })
            .then(() => {
                refreshQuantity();
            })
            .catch((error) => {
                console.error('Gagal mengurangi jumlah produk:', error);
            });
    };

    return (
        <Card className="flex flex-row p-0">
            <div className="size-24 p-2">
                {product.thumbnail ? (
                    <img src={`/storage/${product.thumbnail}`} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full">
                        <AppLogoIcon className="h-full w-full text-neutral-400" />
                    </div>
                )}
            </div>
            <div className="flex w-full justify-between">
                <div className="flex w-full max-w-48 flex-col justify-between p-2">
                    <div>
                        <p className="text-base font-semibold">{product.name}</p>
                        <p className="text-xs capitalize">{product.category.name}</p>
                    </div>
                    <div className="flex max-w-28 justify-between gap-2">
                        <Button onClick={() => updateItem('decrease')} variant="secondary" className="aspect-square size-4 h-fit p-1">
                            <Minus />
                        </Button>
                        <span>{quantity.toString().padStart(2, '0')}</span>
                        <Button onClick={() => updateItem('increase')} variant="secondary" className="aspect-square size-4 h-fit p-1">
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col justify-center p-2">
                    <Button onClick={() => updateItem('remove')} variant="ghost">
                        <Trash />
                    </Button>
                </div>
            </div>
        </Card>
    );
};
