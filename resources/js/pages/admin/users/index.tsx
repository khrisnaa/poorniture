import HeadingLarge from '@/components/heading-large';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { UserColumn, columns } from './partials/columns';
import { DataTable } from './partials/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
    },
];

interface PageProps {
    users: PaginatedResponse<User>;
}
export default function Index({ users }: PageProps) {
    const data: UserColumn[] = users.data.map((item) => ({
        ...item,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-end justify-between">
                    <div className="flex-1">
                        <HeadingLarge
                            title="Users Dashboard"
                            description="Track your users seamlessly, ensuring smooth organization and effortless control."
                        />
                    </div>
                </div>
                <div className="container mx-auto">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={{
                            currentPage: users.current_page || 1,
                            lastPage: users.last_page || 1,
                            links: users.links || [],
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
