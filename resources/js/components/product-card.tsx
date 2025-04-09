import { useCart } from '@/context/cart-context';
import { useViewContext } from '@/context/view-context';
import { cn } from '@/lib/utils';
import { Category, Product } from '@/types/model';
import { router } from '@inertiajs/react';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

interface ProductCardProps {
    product: Product & { category: Category };
}

export default function ProductCard({ product }: ProductCardProps) {
    console.log(product);
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
        <Card className={cn('group w-full border-none shadow-none', activeView === 2 ? 'sm:w-[calc(50%-32px)]' : 'sm:w-[calc(33.33%-32px)]')}>
            <CardContent onClick={() => router.get(route('products.show', product.id))} className="relative aspect-square max-h-64 cursor-pointer">
                <img src={product.thumbnail ? `/storage/${product.thumbnail}` : '/asset/black_chair.webp'} className="h-full w-full object-cover" />
                <Button
                    variant="secondary"
                    className="group-hover:bg-primary group-hover:text-secondary absolute top-0 right-0 z-10 size-8 rounded-full bg-none transition-all duration-200"
                >
                    <ArrowRight className="-rotate-45 transition-all duration-300 group-hover:rotate-0" />
                </Button>
            </CardContent>
            <CardFooter className="h-full flex-col items-start justify-between gap-6 px-0">
                <div>
                    <p className="line-clamp-2 text-2xl font-bold">{product.name}</p>
                    <p className="text-muted-foreground text-sm capitalize">{product.category.name}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold">
                        IDR <span>{new Intl.NumberFormat('id-ID').format(product.price)}</span>
                    </p>
                    <Button onClick={handleAddCart} variant="outline" className="z-10 size-8 rounded-full bg-none">
                        <Plus />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
