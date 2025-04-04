import { useViewContext } from '@/context/view-context';
import { cn } from '@/lib/utils';
import { Category, Product } from '@/types/model';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

interface ProductCardProps {
    product: Product & { category: Category };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { activeView } = useViewContext();

    const handleAddCart = () => {
        router.post(
            route('cart.store'),
            {
                product_id: product.id,
                quantity: 1,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <Card className={cn('w-full border-none shadow-none', activeView === 2 ? 'sm:w-[calc(50%_-_16px)]' : 'sm:w-[calc(33.33%_-_16px)]')}>
            <CardContent onClick={() => router.get(route('products.show', product.id))} className="relative aspect-square max-h-64 cursor-pointer">
                <img src={`/storage/${product.thumbnail}`} className="h-full w-full object-contain" />
            </CardContent>
            <CardFooter className="flex-col items-start gap-6 px-0">
                <div>
                    <h4 className="text-2xl font-bold">{product.name}</h4>
                    <p className="text-muted-foreground text-sm">
                        {product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1).toLowerCase()}
                    </p>
                </div>
                <div className="flex w-full items-center justify-between pr-8">
                    <h5 className="text-xl font-bold">
                        IDR <span>{new Intl.NumberFormat('id-ID').format(product.price)}</span>
                    </h5>
                    <Button onClick={handleAddCart} variant="outline" className="z-10 size-8 rounded-full bg-none">
                        <Plus />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
