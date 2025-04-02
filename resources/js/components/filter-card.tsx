import { router, usePage } from '@inertiajs/react';
import FilterButton from './filter-button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FilterCardProps {
    items: string[];
    title: string;
    queryKey: string; // Bisa "category", "price", atau filter lainnya
}

interface PageProps {
    filters: {
        [key: string]: string | undefined;
    };
    [key: string]: any;
}

export default function FilterCard({ items, title, queryKey }: FilterCardProps) {
    const { props } = usePage<PageProps>();
    const activeItem = props.filters?.[queryKey] || '';

    const handleFilterClick = (item: string) => {
        const query = new URLSearchParams(window.location.search);

        if (activeItem === item) {
            query.delete(queryKey);
        } else {
            query.set(queryKey, item);
        }

        router.get(`?${query.toString()}`, {}, { preserveScroll: true, replace: true });
    };

    return (
        <Card className="max-w-sm shadow-none">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                {items.map((item) => (
                    <FilterButton key={item} active={item === activeItem} onClick={() => handleFilterClick(item)}>
                        {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                    </FilterButton>
                ))}
            </CardContent>
        </Card>
    );
}
