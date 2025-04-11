import { useCart } from '@/context/cart-context';
import { useViewContext } from '@/context/view-context';
import { cn } from '@/lib/utils';
import { Category, Product } from '@/types/model';
import { router } from '@inertiajs/react';
import { ArrowRight, Plus } from 'lucide-react';
import { toast } from 'sonner';
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
            .post(route('cart.add'), {
                product_id: product.id,
                quantity: 1,
            })
            .then((response) => {
                refreshQuantity();
                toast(response.data.message);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    window.location.href = route('login');
                } else {
                    console.error('Failed add item to cart:', error);
                    toast('Something went wrong.');
                }
            });
    };

    return (
        <Card className={cn('group w-full border-none shadow-none', activeView === 2 ? 'sm:w-[calc(50%-32px)]' : 'sm:w-[calc(33.33%-32px)]')}>
            <CardContent
                onClick={() => router.get(route('products.show', product.id))}
                className={cn('relative aspect-square max-h-64', product.stock === 0 && 'cursor-pointer')}
            >
                {product.stock === 0 && <span className="absolute bottom-0 left-0">Out of stock</span>}
                <img src={product.thumbnail ? `/storage/${product.thumbnail}` : '/asset/black_chair.webp'} className="h-full w-full object-cover" />
                <Button
                    variant="secondary"
                    className="group-hover:bg-primary group-hover:text-secondary absolute top-0 right-0 z-10 size-8 rounded-full bg-none transition-all duration-200"
                >
                    <ArrowRight className="-rotate-45 transition-all duration-300 group-hover:rotate-0" />
                </Button>
            </CardContent>
            <CardFooter className="h-full max-h-36 flex-col items-start justify-between gap-6 px-0">
                <div>
                    <p className="line-clamp-2 text-2xl font-bold">{product.name}</p>
                    <p className="text-muted-foreground text-sm capitalize">{product.category.name}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold">
                        IDR <span>{new Intl.NumberFormat('id-ID').format(product.price)}</span>
                    </p>
                    <Button disabled={product.stock == 0} onClick={handleAddCart} variant="outline" className="z-10 size-8 rounded-full bg-none">
                        <Plus />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
