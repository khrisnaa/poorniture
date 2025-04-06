import { Badge } from '@/components/ui/badge';
import { usePage } from '@inertiajs/react';
import ViewToggle from './view-toggle';
interface PageProps {
    filters: {
        [key: string]: string | undefined;
    };
    [key: string]: any;
}
export default function HeadingSection() {
    const { props } = usePage<PageProps>();

    const category = props.filters?.category;
    const categoryTitle = category === 'all' ? 'All Products' : category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <Badge variant="outline" className="font-base rounded-full px-6 py-1 text-lg">
                        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'Products'}
                    </Badge>
                    <h1 className="text-6xl font-semibold">{categoryTitle}</h1>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                    <h4 className="text-muted-foreground">View</h4>
                    <ViewToggle />
                </div>
                <p className="text-muted-foreground max-w-sm text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat odio aspernatur sequi rem perspiciatis, in incidunt tempore
                    adipisci sapiente obcaecati. Et eveniet delectus quidem sed.
                </p>
            </div>
        </div>
    );
}
