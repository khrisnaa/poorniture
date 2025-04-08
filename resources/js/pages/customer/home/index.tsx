import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';
import AboutSection from './partials/about-section';
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
                <div className="min-h-screen translate-y-[100dvh]">
                    <ProductsSection />
                    <AboutSection />
                    <div className="h-screen" />
                </div>
            </div>
        </ClientLayout>
    );
}
