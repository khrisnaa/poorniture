import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';
import HeroSection from './partials/hero-section';
import ImageSection from './partials/image-section';
import ProductsSection from './partials/products-section';

export default function Index() {
    return (
        <ClientLayout>
            <Head title="Home" />
            <div>
                <HeroSection />
                <div className="absolute top-[100dvh] left-0 h-screen w-full">
                    <ImageSection />
                </div>
                <div className="h-screen translate-y-[100dvh]">
                    <ProductsSection />
                </div>
            </div>
        </ClientLayout>
    );
}
