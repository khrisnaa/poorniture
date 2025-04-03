import DashboardCard from '@/components/dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartAreaInteractive } from './partials/chart-area-interactive';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <SectionCards /> */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-48 overflow-hidden rounded-xl border">
                        <DashboardCard />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-48 overflow-hidden rounded-xl border">
                        <DashboardCard />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-48 overflow-hidden rounded-xl border">
                        <DashboardCard />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <ChartAreaInteractive />
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>
        </AppLayout>
    );
}
