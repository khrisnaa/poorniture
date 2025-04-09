import { Badge } from '@/components/ui/badge';
import ViewToggle from '@/components/view-toggle';
import { usePage } from '@inertiajs/react';

interface PageProps {
    filters: {
        [key: string]: string | undefined;
    };
    [key: string]: any;
}

export default function TopSection() {
    const { props } = usePage<PageProps>();
    const category = props.filters?.category;
    const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
    const title = category === 'all' || !category ? 'All Products' : formattedCategory;

    return (
        <div className="flex h-[25dvh] items-end justify-between">
            <div className="flex h-full flex-col justify-between">
                <div className="space-y-4">
                    <Badge variant="outline" className="rounded-full px-4 py-2">
                        {category ? `${formattedCategory} Products` : 'Products'}
                    </Badge>
                    <h1 className="text-7xl font-bold">{title}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-medium">View</span>
                    <ViewToggle />
                </div>
            </div>
            <p className="font-inter max-w-xs py-4 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, enim? Lorem ipsum dolor, sit amet consectetur adipisicing elit. A,
                nostrum?
            </p>
        </div>
    );
}
