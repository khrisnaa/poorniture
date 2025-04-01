import HeadingLarge from '@/components/heading-large';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ProductForm } from '@/types/form';
import { Category } from '@/types/model';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import ImagesUpload from './partials/images-upload';
import ThumbnailUpload from './partials/thumbnail-upload';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
    {
        title: 'New',
        href: '/admin/products/create',
    },
];

interface PageProps {
    categories: Category[];
}

export default function Create({ categories }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ProductForm>>({
        category_id: '',
        name: '',
        price: 0,
        stock: 0,
        description: '',
        thumbnail: null,
        images: [],
    });

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\./g, '');
        setData('price', rawValue === '' ? 0 : parseInt(rawValue, 10));
    };

    const formatPrice = (value: number) => {
        return value.toLocaleString('id-ID');
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Products" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div className="flex w-full items-end justify-between">
                    <div className="flex-1">
                        <HeadingLarge
                            title="Create New Product"
                            description="Add your latest products with ease and keep your inventory fresh and updated."
                        />
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="gap-4 rounded-md border p-4">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        value={data.name}
                                        autoFocus
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Product name"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select name="category_id" value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <div className="relative flex items-center">
                                        <Input
                                            id="price"
                                            type="text"
                                            name="price"
                                            value={formatPrice(data.price)}
                                            onChange={handlePriceChange}
                                            placeholder="0"
                                            min={1}
                                            className="flex-1 pl-12"
                                        />
                                        <span className="absolute left-4 text-sm text-gray-600">IDR</span>
                                    </div>
                                    <InputError message={errors.price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        value={data.stock || ''}
                                        onChange={(e) => setData('stock', e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
                                        placeholder="0"
                                        min={0}
                                    />
                                    <InputError message={errors.stock} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Product description"
                                    className="min-h-32"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <ThumbnailUpload setData={setData} errors={errors} />

                            <ImagesUpload setData={setData} errors={errors} data={data} />

                            <div className="my-6 flex items-center justify-start">
                                <Button size="lg" type="submit" className="w-full" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Save Product
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
