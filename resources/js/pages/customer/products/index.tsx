import FilterCard from '@/components/filter-card';
import ProductCard from '@/components/product-card';
import ClientLayout from '@/layouts/client-layout';
import { Category, Product } from '@/types/model';
import { Head } from '@inertiajs/react';
import HeadingSection from './partials/heading-section';

interface PageProps {
    products: (Product & { category: Category })[];
    categories: string[];
    prices: { value: string; min: number; max: number }[];
    filters: any;
}
export default function Index({ products, filters, categories, prices }: PageProps) {
    return (
        <ClientLayout>
            <Head title="Products" />
            <main className="py-6">
                <HeadingSection />
                <div className="flex min-h-screen gap-12 py-6">
                    <section className="w-[20rem] space-y-6">
                        <FilterCard queryKey="category" title="Product Categories" items={['all', ...categories].sort()} />
                        <FilterCard queryKey="price" title="Price Ranges" items={prices.map((price) => price.value)} />
                    </section>
                    <section className="flex flex-1 flex-wrap gap-4">
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
