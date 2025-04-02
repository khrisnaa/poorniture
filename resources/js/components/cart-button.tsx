import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

export default function CartButton() {
    return (
        <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
            <ShoppingCart className="!size-5 opacity-80 group-hover:opacity-100" />
        </Button>
    );
}
