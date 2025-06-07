import AppLogoIcon from '@/components/app-logo-icon';
import { FilterButton, FilterDrawer } from '@/components/filter-drawer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/model';
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
        <div className="min-h-screen space-y-4 py-16 xl:space-y-16">
            <div className="flex flex-col justify-between xl:flex-row xl:items-end">
                <h2 className="max-w-md text-6xl font-bold md:text-8xl">Our Products.</h2>
                <p className="font-inter max-w-64 px-2 py-4 text-sm text-neutral-700 md:px-0">
                    A wide variaty of quality product categories are ready to spoil your eyes, choose and order now!
                </p>
            </div>
            <div className="flex flex-col xl:flex-row">
                {/* Mobile Filter */}
                <div className="xl:hidden">
                    <FilterDrawer categories={categories} onClick={(category) => handleActive(category)} activeCategory={activeCategory} />
                </div>
                {/* Desktop Filter */}
                <div className="hidden w-full max-w-1/3 xl:block">
                    <div className="flex max-w-72 flex-col gap-4 py-8">
                        {categories.map((category, i) => (
                            <FilterButton onClick={() => handleActive(category)} key={i} active={category === activeCategory} text={category} />
                        ))}
                    </div>
                </div>
                <div className="w-full xl:max-w-2/3">
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

interface FilteredProductProps {
    product: Product;
}
encodeURI;

const FilteredProduct = ({ product }: FilteredProductProps) => {
    return (
        <Card className="w-[calc(50%-8px)] cursor-pointer justify-between border-none shadow-none md:w-[calc(33.33%-10.66px)]">
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
                    <p className="text-muted-foreground line-clamp-1 text-sm">{product.description}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <p className="text-base font-semibold md:text-xl">{formatPrice(product.price)}</p>
                </div>
            </CardFooter>
        </Card>
    );
};
