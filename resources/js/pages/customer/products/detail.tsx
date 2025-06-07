import BackButton from '@/components/back-button';
import { Badge } from '@/components/ui/badge';
import ClientLayout from '@/layouts/client-layout';
import { Category, Product, ProductImage } from '@/types/model';
import { Head } from '@inertiajs/react';
import AddCart from './partials/add-cart';
import ImageSlider from './partials/image-slider';

interface PageProps {
    product: Product & { category: Category } & { images: ProductImage[] };
}

export default function Detail({ product }: PageProps) {
    return (
        <ClientLayout>
            <Head title="Product Details" />
            <BackButton link="products.index" />
            <main className="relative flex h-full flex-col md:h-[calc(100dvh-128px)] md:flex-row">
                <div className="flex w-full flex-col justify-center gap-8 md:w-1/3">
                    <div className="space-y-4">
                        <div className="space-y-4 md:space-y-0">
                            <Badge variant="outline" className="rounded-full px-4 py-2 capitalize">
                                {product.category.name}
                            </Badge>
                            <h1 className="px-2 text-6xl font-bold md:px-0 md:text-8xl">{product.name}</h1>
                        </div>
                        <p className="px-2 text-sm">{product.description}</p>
                    </div>
                    {product.stock != 0 && <AddCart id={product.id} />}
                </div>
                <div className="h-[50dvh] w-full md:h-full md:w-2/3">
                    <ImageSlider images={product.images} />
                </div>
            </main>
        </ClientLayout>
    );
}
