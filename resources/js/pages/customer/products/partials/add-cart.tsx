import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function AddCart({ id }: { id: string }) {
    const { refreshQuantity } = useCart();

    const handleAddCart = () => {
        window.axios
            .post(route('cart.add'), {
                product_id: id,
                quantity: 1,
            })
            .then((response) => {
                refreshQuantity();
                toast(response.data.message);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    window.location.href = route('login');
                } else {
                    console.error('Failed add item to cart:', error);
                    toast('Something went wrong.');
                }
            });
    };
    return (
        <Button onClick={handleAddCart} variant="outline" className="h-fit w-fit gap-4 rounded-full px-6 py-2">
            Add to cart{' '}
            <span className="bg-primary text-secondary rounded-full p-2">
                <ArrowRight className="size-3" />
            </span>
        </Button>
    );
}
