import { Badge } from '@/components/ui/badge';
import ViewToggle from './view-toggle';

export default function HeadingSection() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-6">
                <Badge variant="outline" className="font-base rounded-full px-6 py-1 text-lg">
                    Products
                </Badge>
                <h1 className="text-8xl font-semibold">All Products</h1>
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
