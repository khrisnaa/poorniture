import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <div className="fixed top-0 z-[11] w-full bg-white">
                <AppHeader breadcrumbs={breadcrumbs} />
            </div>
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
