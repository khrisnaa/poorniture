import HeadingLarge from '@/components/heading-large';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse } from '@/types';
import { Category, Product } from '@/types/model';
import { Head, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { columns, ProductColumn } from './partials/columns';
import { DataTable } from './partials/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
];

interface PageProps {
    products: PaginatedResponse<Product & { category: Category }>;
}

export default function Index({ products }: PageProps) {
    const data: ProductColumn[] = products.data.map((item) => ({
        ...item,
        price: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(item.price),
        category: item.category?.name,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-end justify-between">
                    <div className="flex-1">
                        <HeadingLarge
                            title="Manage Products"
                            description="Take full control of your products organize, track, and manage them effortlessly in one place."
                        />
                    </div>
                    <div className="flex flex-[0.5] justify-end">
                        <Button onClick={() => router.get(route('admin.products.create'))}>
                            <Plus /> New Product
                        </Button>
                    </div>
                </div>
                <div className="container mx-auto">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={{
                            currentPage: products.current_page || 1,
                            lastPage: products.last_page || 1,
                            links: products.links || [],
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
