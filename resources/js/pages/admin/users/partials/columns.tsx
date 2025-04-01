import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type UserColumn = {
    id: string;
    email: string;
    name: string;
};

export const columns: ColumnDef<UserColumn>[] = [
    {
        id: 'index',
        header: '#',
        cell: ({ table, row }) => {
            const index = table.getSortedRowModel().rows.findIndex((r) => r.id === row.id);
            return (index + 1).toString().padStart(2, '0');
        },
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
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <button
                    className="hover:text-primary flex cursor-pointer items-center gap-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    User Name
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            );
        },
    },
];
