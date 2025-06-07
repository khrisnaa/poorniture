import { useCart } from '@/context/cart-context';
import { useViewContext } from '@/context/view-context';
import { cn } from '@/lib/utils';
import { Category, Product } from '@/types/model';
import { router } from '@inertiajs/react';
import { ArrowRight, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AppLogoIcon from './app-logo-icon';
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
        <Card
            className={cn(
                'group w-full border-none shadow-none',
                activeView === 2 ? 'w-[calc(50%-8px)] sm:w-[calc(50%-32px)]' : 'w-[calc(33.33%-10.66px)] sm:w-[calc(33.33%-32px)]',
            )}
        >
            <CardContent
                onClick={() => router.get(route('products.show', product.id))}
                className={cn('relative aspect-square max-h-64', product.stock != 0 && 'cursor-pointer')}
            >
                {product.stock === 0 && <span className="absolute bottom-0 left-0">Out of stock</span>}
                {product.thumbnail ? (
                    <img src={`/storage/${product.thumbnail}`} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full">
                        <AppLogoIcon className="h-full w-full text-neutral-400" />
                    </div>
                )}
                <Button
                    variant="secondary"
                    className="group-hover:bg-primary group-hover:text-secondary absolute top-0 right-0 z-10 size-8 rounded-full bg-none transition-all duration-200"
                >
                    <ArrowRight className="-rotate-45 transition-all duration-300 group-hover:rotate-0" />
                </Button>
            </CardContent>
            <CardFooter className="h-full max-h-36 flex-col items-start justify-between gap-3 px-0 xl:gap-6">
                <div>
                    <p className="line-clamp-2 text-2xl font-bold">{product.name}</p>
                    <p className="text-muted-foreground text-sm capitalize">{product.category.name}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold xl:text-lg">
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
