import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export type CategoryColumn = {
    id: string;
    name: string;
    products: number;
};

export const columns: ColumnDef<CategoryColumn>[] = [
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
        accessorKey: 'products',
        header: ({ column }) => {
            return (
                <button
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Products Count
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            );
        },
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const category = row.original;

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
                            <DropdownMenuItem onClick={() => router.get(route('admin.categories.edit', category.id))}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.delete(route('admin.categories.destroy', category.id))} className="text-red-400">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
