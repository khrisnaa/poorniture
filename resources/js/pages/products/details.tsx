import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ClientLayout from '@/layouts/client-layout';
import { Category, Product, ProductImage } from '@/types/model';
import { Head } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

interface PageProps {
    product: Product & { category: Category; images: ProductImage[] };
}
export default function Detail({ product }: PageProps) {
    const handleBack = () => {
        window.history.back();
    };
    return (
        <ClientLayout>
            <Head title={product.name} />
            <div>
                <div className="mx-auto max-w-5xl py-4">
                    <Button variant="ghost" onClick={handleBack}>
                        <ChevronLeft />
                        Back
                    </Button>
                </div>
                <div className="mx-auto flex h-full max-w-5xl justify-between gap-8 px-5">
                    <div className="flex w-full flex-col justify-center gap-6">
                        <div className="space-y-2">
                            <h2 className="text-5xl font-bold">{product.name}</h2>
                            <p className="text-muted-foreground capitalize">{product.category.name}</p>
                        </div>
                        <p>{product.description}</p>
                        <h3 className="text-3xl font-bold">
                            IDR <span>{new Intl.NumberFormat('id-ID').format(product.price)}</span>
                        </h3>
                    </div>
                    <Carousel className="relative w-full max-w-md" opts={{ loop: true }}>
                        <CarouselContent>
                            {product.images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center overflow-hidden p-6">
                                                <img src={`/storage/${image.image_url}`} className="h-full w-full object-cover" />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </ClientLayout>
    );
}
