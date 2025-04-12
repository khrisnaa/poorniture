import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@/types/model';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type LatestProducts = {
    tables: Product[];
    buffets: Product[];
    nightsands: Product[];
    sofas: Product[];
    chairs: Product[];
};

export default function ProductsSection() {
    const [categories, setCategories] = useState<string[]>([]);
    const [latestProducts, setLatestProducts] = useState<LatestProducts | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, productsRes] = await Promise.all([
                    window.axios.get(route('categories.names')),
                    window.axios.get(route('products.latest')),
                ]);

                const fetchedCategories = categoriesRes.data.categories;
                setCategories(fetchedCategories);
                setLatestProducts(productsRes.data.latestProducts);

                if (fetchedCategories.length > 0) {
                    setActiveCategory(fetchedCategories[0]); // auto set category aktif pertama
                }
            } catch (error) {
                console.error('Gagal mengambil data:', error);
            }
        };

        fetchData();
    }, []);

    const handleActive = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <div className="min-h-screen space-y-16 py-16">
            <div className="flex items-end justify-between">
                <h2 className="max-w-md text-8xl font-bold">Our Products.</h2>
                <p className="font-inter max-w-64 py-4 text-sm">
                    A wide variaty of quality product categories are ready to spoil your eyes, choose and order now!
                </p>
            </div>
            <div className="flex">
                <div className="w-full max-w-1/3">
                    <div className="flex max-w-72 flex-col gap-4 py-8">
                        {categories.map((category, i) => (
                            <FilterButton onClick={() => handleActive(category)} key={i} active={category === activeCategory} text={category} />
                        ))}
                    </div>
                </div>
                <div className="w-full max-w-2/3">
                    <div className="flex flex-wrap gap-4">
                        {latestProducts && latestProducts[activeCategory as keyof LatestProducts] ? (
                            latestProducts[activeCategory as keyof LatestProducts]?.map((product, index) => (
                                <FilteredProduct key={index} product={product} />
                            ))
                        ) : (
                            <p>No products found for this category.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FilterButtonProps {
    active?: boolean;
    text: string;
    onClick: () => void;
}

const FilterButton = ({ active, text, onClick }: FilterButtonProps) => {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            className={cn(
                'group flex justify-between rounded-full !px-6 py-5 font-medium uppercase transition-all duration-200',
                active && 'bg-primary text-secondary hover:bg-primary/90 hover:text-secondary',
            )}
        >
            <span>{text}</span>
            <ArrowRight className={cn('-rotate-45 transition-all duration-300 group-hover:rotate-0', active && 'rotate-0')} />
        </Button>
    );
};

interface FilteredProductProps {
    product: Product;
}
encodeURI;

const FilteredProduct = ({ product }: FilteredProductProps) => {
    return (
        <Card className="w-[calc(33%-16px)] cursor-pointer justify-between border-none shadow-none">
            <CardContent className="group relative aspect-square">
                {product.thumbnail ? (
                    <img src={`/storage/${product.thumbnail}`} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full">
                        <AppLogoIcon className="h-full w-full text-neutral-400" />
                    </div>
                )}
                <div className="absolute top-[4vh] -left-[3dvw] flex translate-y-4 items-center gap-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="bg-primary text-secondary p-3">
                        <h3 className="text-sm">Minimalist Comfort</h3>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <div>
                    <p className="text-3xl font-bold">{product.name}</p>
                    <p className="text-muted-foreground text-sm">{product.description}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
                </div>
            </CardFooter>
        </Card>
    );
};
