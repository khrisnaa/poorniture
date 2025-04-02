import { ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function CartButton() {
    return (
        <div className="relative w-fit">
            <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
                <ShoppingCart className="!size-5 opacity-80 group-hover:opacity-100" />
            </Button>
            <Badge className="border-secondary absolute top-0 -right-2 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border text-xs leading-none">
                10
            </Badge>
        </div>
    );
}
