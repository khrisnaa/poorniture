import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/context/cart-context';
import { ViewProvider } from '@/context/view-context';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <ViewProvider>
        <CartProvider>
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                <main className="px-3">{children}</main>
                <Toaster />
            </AppLayoutTemplate>
        </CartProvider>
    </ViewProvider>
);
