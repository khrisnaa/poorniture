import FilterCard from '@/components/filter-card';
import { FilterCardDrawer } from '@/components/filter-card-drawer';
import ProductCard from '@/components/product-card';
import ClientLayout from '@/layouts/client-layout';
import { Category, Product } from '@/types/model';
import { Head } from '@inertiajs/react';
import TopSection from './partials/top-section';

interface FilterData {
    id: string;
    value: string;
}
interface PageProps {
    products: (Product & { category: Category })[];
    categories: FilterData[];
    priceRanges: FilterData[];
    filters: {
        category: string;
        price: string;
    };
}

export default function Index({ categories, filters, priceRanges, products }: PageProps) {
    return (
        <ClientLayout>
            <Head title="Products" />
            <main className="space-y-4 py-8">
                <TopSection />
                <div className="flex flex-col gap-4 pt-4 md:flex-row md:gap-0 md:pt-0">
                    <div className="md:hidden">
                        <FilterCardDrawer categories={categories} priceRanges={priceRanges} />
                    </div>
                    <section className="relative hidden w-1/3 py-8 md:block">
                        <div className="sticky top-24 flex flex-col gap-8">
                            <FilterCard queryKey="category" title="Product Categories" items={categories} />
                            <FilterCard queryKey="price" title="Price Range" items={priceRanges} />
                        </div>
                    </section>
                    <section className="flex w-full flex-wrap gap-4 md:w-2/3 md:gap-8">
                        {products.length === 0 ? (
                            <p className="h-full w-full py-32 text-center text-xl font-semibold text-gray-500">No products found</p>
                        ) : (
                            products.map((product) => <ProductCard product={product} key={product.id} />)
                        )}
                    </section>
                </div>
            </main>
        </ClientLayout>
    );
}
