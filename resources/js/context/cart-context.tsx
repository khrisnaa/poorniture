'use client';

import axios from 'axios';
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

    const refreshQuantity = async () => {
        try {
            const res = await axios.get('/cart/count');
            setQuantity(res.data.count);
        } catch (error) {
            console.error('Failed to fetch cart count', error);
        }
    };

    useEffect(() => {
        refreshQuantity();
    }, []);

    return <CartContext.Provider value={{ quantity, refreshQuantity }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
