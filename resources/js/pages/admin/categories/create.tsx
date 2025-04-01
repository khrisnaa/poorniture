import HeadingLarge from '@/components/heading-large';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CategoryForm } from '@/types/form';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/admin/categories',
    },
    {
        title: 'New',
        href: '/admin/categories/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CategoryForm>>({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-end justify-between">
                    <div className="flex-1">
                        <HeadingLarge
                            title="Create New Category"
                            description="Add your latest Categories with ease and keep your inventory fresh and updated."
                        />
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="gap-4 rounded-md border p-4">
                        <form onSubmit={submit} className="mx-auto max-w-lg space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    value={data.name}
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Category name"
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div className="my-12 flex items-center justify-center">
                                <Button size="lg" type="submit" className="w-full max-w-lg py-6" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create Category
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
