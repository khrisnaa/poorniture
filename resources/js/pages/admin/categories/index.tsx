import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/admin/categories',
    },
];

export default function Index() {
    const { categories } = usePage().props as { categories?: Category[] };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">at</div>
        </AppLayout>
    );
}
