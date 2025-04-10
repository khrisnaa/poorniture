import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ClientLayout from '@/layouts/client-layout';
import { Category, Product, ProductImage } from '@/types/model';
import { Head } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import AddCart from './partials/add-cart';
import ImageSlider from './partials/image-slider';

interface PageProps {
    product: Product & { category: Category } & { images: ProductImage };
}

export default function Detail({ product }: PageProps) {
    return (
        <ClientLayout>
            <Head title="Product Details" />
            <main className="relative flex h-[calc(100dvh-64px)]">
                <Button variant="link" className="absolute top-8 left-0 gap-1 text-xs" onClick={() => window.history.back()}>
                    <ChevronLeft />
                    Back
                </Button>
                <div className="flex w-1/3 flex-col justify-center gap-8">
                    <div className="space-y-4">
                        <div>
                            <Badge variant="outline" className="rounded-full px-4 py-2 capitalize">
                                {product.category.name}
                            </Badge>
                            <h1 className="text-8xl font-bold">{product.name}</h1>
                        </div>
                        <p className="px-2 text-sm">{product.description}</p>
                    </div>
                    <AddCart id={product.id} />
                </div>
                <div className="w-2/3">
                    <ImageSlider />
                </div>
            </main>
        </ClientLayout>
    );
}
