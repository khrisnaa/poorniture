import FilterCard from '@/components/filter-card';
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
                <div className="flex min-h-screen gap-6 py-6">
                    <section className="w-full max-w-sm space-y-6">
                        <FilterCard queryKey="category" title="Product Categories" items={['all', ...categories]} />
                        <FilterCard queryKey="price" title="Price Ranges" items={prices.map((price) => price.value)} />
                    </section>
                    <section className="w-full">
                        {products.map((product, i) => (
                            <p>{product.name}</p>
                        ))}
                    </section>
                </div>
            </main>
        </ClientLayout>
    );
}
