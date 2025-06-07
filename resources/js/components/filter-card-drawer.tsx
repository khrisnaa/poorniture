import { Settings2 } from 'lucide-react';
import FilterCard from './filter-card';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';

interface FilterData {
    id: string;
    value: string;
}

interface FilterCardDrawerProps {
    categories: FilterData[];
    priceRanges: FilterData[];
}
export const FilterCardDrawer = ({ categories, priceRanges }: FilterCardDrawerProps) => {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="rounded-full">
                    <Settings2 />
                    Filter
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Product Filter</DrawerTitle>
                        <DrawerDescription>Set your product preference.</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col flex-wrap gap-4 pb-16">
                        <FilterCard queryKey="category" title="Product Categories" items={categories} />
                        <FilterCard queryKey="price" title="Price Range" items={priceRanges} />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
