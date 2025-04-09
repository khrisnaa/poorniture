import { useCart } from '@/context/cart-context';
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

    const { refreshQuantity } = useCart();

    const handleAddCart = () => {
        window.axios
            .post(route('cart.store'), {
                product_id: product.id,
                quantity: 1,
            })
            .then(() => {
                refreshQuantity();
            })
            .catch((error) => {
                console.error('Gagal menambahkan ke cart:', error);
            });
    };

    return (
        <Card className={cn('w-full border-none shadow-none', activeView === 2 ? 'sm:w-[calc(50%_-_16px)]' : 'sm:w-[calc(33.33%_-_16px)]')}>
            <CardContent onClick={() => router.get(route('products.show', product.id))} className="relative aspect-square max-h-64 cursor-pointer">
                <img src={product.thumbnail ? `/storage/${product.thumbnail}` : '/asset/black_chair.webp'} className="h-full w-full object-contain" />
            </CardContent>
            <CardFooter className="flex-col items-start gap-6 px-0">
                <div>
                    <p className="text-2xl font-bold">{product.name}</p>
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
