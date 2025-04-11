import DeleteModal from '@/components/delete-modal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export type ProductColumn = {
    id: string;
    name: string;
    price: string;
    stock: number;
    category: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
    {
        id: 'index',
        header: '#',
        cell: ({ table, row }) => {
            const index = table.getSortedRowModel().rows.findIndex((r) => r.id === row.id);
            return (index + 1).toString().padStart(2, '0');
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <button
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            );
        },
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        accessorKey: 'category',
        header: ({ column }) => {
            return (
                <button
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Category
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            );
        },
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original;

            const [open, setOpen] = useState(false);

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
                            <DropdownMenuItem onClick={() => router.get(route('admin.products.edit', product.id))}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400" onClick={() => setOpen(true)}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteModal
                        open={open}
                        onOpenChange={() => setOpen(!open)}
                        action={() => {
                            router.delete(route('admin.products.destroy', product.id), {
                                preserveScroll: true,
                                onSuccess: (page) => {
                                    const message = (page as any)?.props?.message ?? 'Deleted successfully';
                                    toast.success(message);
                                    console.log(message);
                                    setOpen(false);
                                },
                                onError: () => {
                                    toast.error('Failed to delete item');
                                },
                            });
                        }}
                        title="Are you sure?"
                        description="Deleting this item will permanently remove it from the system. This action cannot be undone. Do you wish to proceed?"
                    />
                </div>
            );
        },
    },
];
