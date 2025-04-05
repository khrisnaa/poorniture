import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import ChartSheet from './cart-sheet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function CartButton() {
    const { quantity } = useCart();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="ghost" size="icon" className="group cursor- relative h-9 w-9">
                <ShoppingCart className="!size-5 opacity-80 group-hover:opacity-100" />

                {quantity ? (
                    <Badge className="border-secondary absolute top-0 -right-2 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border text-xs leading-none">
                        {quantity}
                    </Badge>
                ) : (
                    ''
                )}
            </Button>

            <ChartSheet open={open} onOpenChange={() => setOpen(!open)} />
        </>
    );
}
