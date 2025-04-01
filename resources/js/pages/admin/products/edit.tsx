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
import { Category, Product, ProductImage } from '@/types/model';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import ImagesUpload from './partials/images-upload';
import PriceInput from './partials/price-input';
import ThumbnailUpload from './partials/thumbnail-upload';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/admin/products',
    },
    {
        title: 'Edit',
        href: '/admin/products/edit',
    },
];

interface PageProps {
    categories: Category[];
    product: Product & { images: ProductImage[] };
}

export default function Edit({ categories, product }: PageProps) {
    const [remainingDefaultImages, setRemainingDefaultImages] = useState<string[]>([]);

    const { data, setData, put, processing, errors, reset } = useForm<Required<ProductForm>>({
        category_id: product.category_id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        thumbnail: null,
        images: [],
    });

    const handleRemainingImages = (remainingUrls: string[]) => {
        setRemainingDefaultImages(remainingUrls);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('admin.products.update', product.id), {
            _method: 'put',
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            default_images: remainingDefaultImages,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Products" />
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <div className="flex w-full items-end justify-between">
                    <div className="flex-1">
                        <HeadingLarge
                            title="Edit a Product"
                            description="Update your latest products with ease and keep your inventory fresh and updated."
                        />
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="gap-4 rounded-md border p-4">
                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
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
                                            <SelectValue>
                                                {categories.find((cat) => cat.id === data.category_id)?.name || 'Select a category'}
                                            </SelectValue>
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
                                <PriceInput setData={setData} data={data} errors={errors} />

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
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <ThumbnailUpload setData={setData} errors={errors} existingThumbnail={product.thumbnail} />
                                </div>
                                <div className="flex-1">
                                    <ImagesUpload
                                        setData={setData}
                                        errors={errors}
                                        data={data}
                                        onRemainingImagesChange={handleRemainingImages}
                                        defaultImages={product.images.map((item) => item.image_url)}
                                    />
                                </div>
                            </div>

                            <div className="my-12 flex items-center justify-center">
                                <Button size="lg" type="submit" className="w-full max-w-lg py-6" disabled={processing}>
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
