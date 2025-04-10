'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
    quantity: number;
    refreshQuantity: () => void;
}

const CartContext = createContext<CartContextType>({
    quantity: 0,
    refreshQuantity: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [quantity, setQuantity] = useState(0);

    const refreshQuantity = () => {
        window.axios
            .get(route('cart.items'))
            .then((res) => {
                const items = res.data.items || [];
                const total = items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
                setQuantity(total);
            })
            .catch((error) => {
                console.error('Failed to fetch cart items', error);
            });
    };

    useEffect(() => {
        refreshQuantity();
    }, []);

    return <CartContext.Provider value={{ quantity, refreshQuantity }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
