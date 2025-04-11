import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { calculateTotal, formatPrice } from '@/lib/utils';
import { Order, OrderItem, Product } from '@/types/model';

interface DetailModalProps {
    open: boolean;
    onOpenChange: () => void;
    order: Order & { items: (OrderItem & { product: Product })[] };
}
export default function DetailModal({ onOpenChange, open, order }: DetailModalProps) {
    const shipping = 1000000;
    const { subtotal, tax, total } = calculateTotal(order.items);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="font-inter relative">
                    <div className="bg-muted space-y-4 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <Badge className="rounded-md px-4 py-2 capitalize">{order.status}</Badge>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{formatPrice(shipping)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>{formatPrice(tax)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold">Order Items</h3>
                            {order.items.map((item) => item.product && <ItemDetail key={item.id} item={item} />)}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface ItemDetailProps {
    item: OrderItem & { product: Product };
}
function ItemDetail({ item }: ItemDetailProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img
                    src={item.product.thumbnail ?? '/asset/black_chair.webp'}
                    alt="Product Image"
                    width={64}
                    height={64}
                    className="rounded-md"
                    style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                />
                <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                </div>
            </div>
            <span className="font-medium">{formatPrice(item.subtotal)}</span>
        </div>
    );
}
