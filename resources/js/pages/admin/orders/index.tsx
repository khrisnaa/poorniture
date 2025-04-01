import HeadingLarge from '@/components/heading-large';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse, User } from '@/types';
import { Order } from '@/types/model';
import { Head, router } from '@inertiajs/react';
import { OrderColumn, columns } from './partials/columns';
import { DataTable } from './partials/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/admin/orders',
    },
];

interface PageProps {
    orders: PaginatedResponse<Order & { user: User }>;
}
export default function Index({ orders }: PageProps) {
    const data: OrderColumn[] = orders.data.map((item) => ({
        ...item,
        email: item.user.email,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-end justify-between">
                    <div className="flex-1">
                        <HeadingLarge
                            title="Orders Dashboard"
                            description="Track your orders seamlessly, ensuring smooth organization and effortless control."
                        />
                    </div>
                </div>
                <div className="container mx-auto">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={{
                            currentPage: orders.current_page || 1,
                            lastPage: orders.last_page || 1,
                            links: orders.links || [],
                            onPageChange: (page) => {
                                router.get(`?page=${page}`, {}, { replace: true });
                            },
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
