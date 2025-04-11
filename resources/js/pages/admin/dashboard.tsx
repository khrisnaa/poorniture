import DashboardCard from '@/components/dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { formatPrice } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartAreaInteractive } from './partials/chart-area-interactive';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export interface TrendData {
    total: number;
    last: number;
    current?: number;
    trend: 'up' | 'down' | 'flat';
    percentage: number;
}

export interface PageProps {
    revenue: TrendData;
    users: TrendData;
    products: TrendData;
}

export default function Dashboard({ revenue, users, products }: PageProps) {
    const formatPercentage = (value: number) => {
        return `+${value.toString()}%`;
    };

    function getTrendDescription(trend: 'up' | 'down' | 'flat', type: string): string {
        switch (trend) {
            case 'up':
                return `More ${type} this month!`;
            case 'down':
                return `${type.charAt(0).toUpperCase() + type.slice(1)} decreased compared to last month.`;
            case 'flat':
                return `${type.charAt(0).toUpperCase() + type.slice(1)} stayed the same as last month.`;
            default:
                return '';
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <SectionCards /> */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-48 overflow-hidden rounded-xl border">
                        <DashboardCard
                            title="Total Revenue"
                            value={formatPrice(revenue.total)}
                            percentageChange={formatPercentage(revenue.percentage)}
                            trend={revenue.trend}
                            description={`Revenue is trending ${revenue.trend} this month!`}
                        />
                        ;
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-48 overflow-hidden rounded-xl border">
                        <DashboardCard
                            title="Total User Registrations"
                            value={users.total + ' Users'}
                            percentageChange={formatPercentage(users.percentage)}
                            trend={users.trend}
                            description={getTrendDescription(users.trend, 'users')}
                        />
                        ;
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-48 overflow-hidden rounded-xl border">
                        <DashboardCard
                            title="New Products Added"
                            value={products.total + ' Products'}
                            percentageChange={formatPercentage(products.percentage)}
                            trend={products.trend}
                            description={getTrendDescription(products.trend, 'products')}
                        />
                        ;
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
