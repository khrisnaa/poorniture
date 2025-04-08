import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Plus } from 'lucide-react';

export default function ProductsSection() {
    return (
        <div className="min-h-screen space-y-16 py-16">
            <div className="flex items-end justify-between">
                <h2 className="max-w-md text-8xl font-bold">Our Products.</h2>
                <p className="font-inter max-w-64 py-4 text-sm">
                    A wide variaty of quality product categories are ready to spoil your eyes, choose and order now!
                </p>
            </div>
            <div className="flex">
                <div className="w-full max-w-1/3">
                    <div className="flex max-w-72 flex-col gap-4 py-8">
                        <FilterButton active text="Seating" />
                        <FilterButton text="Tables" />
                        <FilterButton text="Cabinets" />
                        <FilterButton text="Bedrooms" />
                        <FilterButton text="Art & Decor" />
                    </div>
                </div>
                <div className="w-full max-w-2/3">
                    <div className="flex flex-wrap gap-4">
                        <FilteredProduct />
                        <FilteredProduct />
                        <FilteredProduct />
                    </div>
                </div>
            </div>
        </div>
    );
}

const FilterButton = ({ active, text }: { active?: boolean; text: string }) => {
    return (
        <Button
            variant="outline"
            className={cn(
                'group flex justify-between rounded-full !px-6 py-5 font-medium uppercase transition-all duration-200',
                active && 'bg-primary text-secondary hover:bg-primary/90 hover:text-secondary',
            )}
        >
            <span>{text}</span>
            <ArrowRight className={cn('-rotate-45 transition-all duration-300 group-hover:rotate-0', active && 'rotate-0')} />
        </Button>
    );
};

const FilteredProduct = () => {
    return (
        <Card className="w-[calc(33%-16px)] border-none shadow-none">
            <CardContent className="aspect-square">
                <img src="/asset/black_chair.png" className="h-full w-full object-cover" />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Morizine</h2>
                    <p className="text-muted-foreground text-sm">Chair with beautfiul black skins.</p>
                </div>
                <div className="flex w-full items-center justify-between">
                    <h4 className="text-2xl font-semibold">$110</h4>
                    <Button variant="outline" className="size-10 rounded-full">
                        <Plus />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
