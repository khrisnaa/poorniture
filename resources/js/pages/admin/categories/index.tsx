import HeadingLarge from '@/components/heading-large';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse } from '@/types';
import { Category, Product } from '@/types/model';
import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { CategoryColumn, columns } from './partials/columns';
import { DataTable } from './partials/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categoriess',
        href: '/admin/categories',
    },
];

interface PageProps {
    categories: PaginatedResponse<Category & { products: Product[] }>;
}
export default function Index({ categories }: PageProps) {
    const data: CategoryColumn[] = categories.data.map((item) => ({
        ...item,
        products: item.products.length,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-end justify-between">
                    <div className="flex-1">
                        <HeadingLarge
                            title="Manage Categories"
                            description="Take full control of your categories organize, track, and manage them effortlessly in one place."
                        />
                    </div>
                    <div className="flex flex-[0.5] justify-end">
                        <Button onClick={() => router.get(route('admin.categories.create'))}>
                            <Plus /> New Category
                        </Button>
                    </div>
                </div>
                <div className="container mx-auto">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={{
                            currentPage: categories.current_page || 1,
                            lastPage: categories.last_page || 1,
                            links: categories.links || [],
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
