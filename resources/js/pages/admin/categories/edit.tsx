import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { CategoryForm } from '@/types/form';
import { Category } from '@/types/model';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/admin/categories',
    },
];

export default function Edit() {
    const { category } = usePage().props as { category?: Category };

    if (!category) {
        return (
            <div>
                <p>Category not found.</p>
            </div>
        );
    }
    const { data, setData, put, processing, errors, reset } = useForm<CategoryForm>({
        name: category.name ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id), {
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="max-w-xl">
                    <form onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Category name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                autoComplete="off"
                                value={data.name}
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Armchair"
                            />

                            <InputError message={errors.name} />
                        </div>

                        <div className="my-6 flex items-center justify-start">
                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
