import FilterCard from '@/components/filter-card';
import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';
import HeadingSection from './partials/heading-section';

const categories = ['chairs', 'buffet', 'table', 'nightstand', 'sofa'];

const prices = [
    { value: '<1jt', min: 0, max: 1000000 },
    { value: '1-3jt', min: 1000000, max: 3000000 },
    { value: '3-5jt', min: 3000000, max: 5000000 },
    { value: '5-10jt', min: 5000000, max: 10000000 },
    { value: '>10jt', min: 10000000, max: Infinity },
];

export default function Index() {
    return (
        <ClientLayout>
            <Head title="Products" />
            <main className="py-6">
                <HeadingSection />
                <div className="flex min-h-screen gap-6 py-6">
                    <section className="w-full max-w-sm space-y-6">
                        <FilterCard title="Categories" items={categories} />
                        <FilterCard title="Price Ranges" items={prices.map((price) => price.value)} />
                    </section>
                    <section className="w-full"></section>
                </div>
            </main>
        </ClientLayout>
    );
}
