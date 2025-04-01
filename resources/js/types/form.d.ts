export type CategoryForm = {
    name: string;
};

export type ProductForm = {
    name: string;
    category_id: string;
    price: number;
    stock: number;
    description: string;
    thumbnail?: File | null;
    images?: File[];
};
