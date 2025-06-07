import { cn } from '@/lib/utils';
import { ArrowRight, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';

interface FilterDrawer {
    categories: string[];
    activeCategory: string;
    onClick: (category: string) => void;
}
export const FilterDrawer = ({ categories, onClick, activeCategory }: FilterDrawer) => {
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
                        {categories.map((category, i) => (
                            <DrawerClose key={i}>
                                <FilterButton onClick={() => onClick(category)} active={category === activeCategory} text={category} />
                            </DrawerClose>
                        ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

interface FilterButtonProps {
    active?: boolean;
    text: string;
    onClick: () => void;
}

export const FilterButton = ({ active, text, onClick }: FilterButtonProps) => {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            className={cn(
                'group flex w-full justify-between rounded-full !px-6 py-5 font-medium uppercase transition-all duration-200',
                active && 'bg-primary text-secondary hover:bg-primary/90 hover:text-secondary',
            )}
        >
            <span>{text}</span>
            <ArrowRight className={cn('-rotate-45 transition-all duration-300 group-hover:rotate-0', active && 'rotate-0')} />
        </Button>
    );
};
