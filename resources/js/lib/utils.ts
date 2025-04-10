import { OrderItem } from '@/types/model';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const setCookie = (name: string, value: string, days = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

export const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const formatPrice = (value: number) => {
    return `IDR ${new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)}`;
};

export const calculateTotal = (items: OrderItem[], shipping: number = 1000000) => {
    const subtotal = items.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);
    const tax = (subtotal + shipping) * 0.1;
    const total = subtotal + shipping + tax;

    return { subtotal, tax, total };
};
