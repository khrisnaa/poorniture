import { Category, Product } from '@/types/model';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

interface ProductCardProps {
    product: Product & { category: Category };
}
export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="cursorpo w-full border-none shadow-none sm:w-[calc(33%_-_16px)] md:w-[calc(33%_-_16px)]">
            <CardContent className="relative aspect-square max-h-64">
                <img src="/asset/chair.png" className="h-full w-full object-contain" />
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

                    <Button variant="outline" className="size-8 rounded-full bg-none">
                        <Plus />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
