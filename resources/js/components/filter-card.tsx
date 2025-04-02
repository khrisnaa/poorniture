import { useState } from 'react';
import FilterButton from './filter-button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FilterCardProps {
    items: string[];
    title: string;
}
export default function FilterCard({ items, title }: FilterCardProps) {
    const [activeItem, setActiveItem] = useState('');
    return (
        <Card className="max-w-sm shadow-none">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                {items.map((item, i) => (
                    <FilterButton active={item == activeItem} onClick={() => setActiveItem(item)}>
                        {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                    </FilterButton>
                ))}
            </CardContent>
        </Card>
    );
}
