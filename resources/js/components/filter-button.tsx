import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface FilterButtonProps {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
}
export default function FilterButton({ children, active, onClick }: FilterButtonProps) {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            className={cn(
                'group rounded-full px-4 py-5 text-xs font-medium transition-all duration-500',
                active ? 'hover:bg-primary hover:text-secondary bg-primary text-secondary' : 'hover:text-secondary hover:bg-primary',
            )}
        >
            <span className="border-muted-foreground relative flex h-4 w-4 items-center justify-center rounded-full border">
                <span
                    className={cn(
                        'absolute h-2 w-2 rounded-full',
                        active ? 'bg-secondary' : 'bg-none',
                        'transition-all duration-500 group-hover:scale-150',
                    )}
                />
            </span>
            {children}
        </Button>
    );
}
