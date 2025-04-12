import PdfDownload from '@/components/pdf-download';
import PdfStream from '@/components/pdf-stream';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatPrice } from '@/lib/utils';
import { Order, OrderItem, Product } from '@/types/model';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, NotebookIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import DetailModal from './detail-modal';

export type OrderColumn = {
    id: string;
    email: string;
    total_price: number;
    status: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
    {
        id: 'index',
        header: '#',
        cell: ({ table, row }) => {
            const index = table.getSortedRowModel().rows.findIndex((r) => r.id === row.id);
            return (index + 1).toString().padStart(2, '0');
        },
    },
    {
        accessorKey: 'id',
        header: 'Order ID',
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <button
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    User Email
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'total_price',
        header: 'Total Price',
        cell: ({ row }) => {
            return <span>{formatPrice(row.original.total_price)}</span>;
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <button
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Status
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const id = row.original.id;

            const [order, setOrder] = useState<(Order & { items: (OrderItem & { product: Product })[] }) | null>(null);

            const [open, setOpen] = useState(false);

            const fetchOrder = async () => {
                try {
                    const response = await window.axios.get(route('admin.orders.show', id));
                    setOrder(response.data.order);
                    setOpen(true);
                } catch (error) {
                    toast.error('Failed to load order details');
                }
            };
            return (
                <div className="flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={fetchOrder}>
                                <Button variant="ghost">
                                    <NotebookIcon /> Show
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <PdfDownload variant="ghost" orderId={id} />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <PdfStream variant="ghost" orderId={id} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {order && <DetailModal open={open} onOpenChange={() => setOpen(!open)} order={order} />}
                </div>
            );
        },
    },
];
