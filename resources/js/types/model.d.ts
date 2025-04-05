export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: string;
    created_at: string;
    updated_at: string;
}

export interface ProductImage {
    id: string;
    product_id: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    total_price: number;
    status: 'pending' | 'completed' | 'canceled';
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
}

export interface Address {
    id: string;
    user_id: string;
    address: string;
    city: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
}

export interface Cart {
    id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: string;
    cart_id: string;
    product_id: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}
