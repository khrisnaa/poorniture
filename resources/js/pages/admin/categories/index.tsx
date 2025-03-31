import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/model';
import { Head, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CategoryColumn, columns } from './partials/columns';
import { DataTable } from './partials/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/admin/categories',
    },
];

export default function Index() {
    const { categories } = usePage().props as {
        categories?: {
            data: Category[];
            current_page: number;
            last_page: number;
            links: { url: string | null; label: string; active: boolean }[];
        };
    };

    const data: CategoryColumn[] = (categories?.data ?? []).map((item) => ({
        ...item,
        created_at: format(new Date(item.created_at), 'dd MMM yyyy HH:mm'),
        updated_at: format(new Date(item.updated_at), 'dd MMM yyyy HH:mm'),
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto py-10">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={{
                            currentPage: categories?.current_page || 1,
                            lastPage: categories?.last_page || 1,
                            links: categories?.links || [],
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
