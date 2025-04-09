import FilterCard from '@/components/filter-card';
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
            <main className="py-8">
                <TopSection />
                <div className="flex">
                    <section className="flex w-1/3 flex-col gap-8 py-8">
                        <FilterCard queryKey="category" title="Product Categories" items={categories} />
                        <FilterCard queryKey="price" title="Price Range" items={priceRanges} />
                    </section>
                    <section className="flex w-2/3 flex-wrap gap-8">
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
