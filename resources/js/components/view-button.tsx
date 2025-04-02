import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ViewButtonProps {
    grid: number;
    active: boolean;
    onClick: () => void;
}
export default function ViewButton({ grid, active, onClick }: ViewButtonProps) {
    return (
        <Button onClick={onClick} variant={active ? 'outline' : 'secondary'} className="border-primary gap-1 px-2 py-1">
            {Array.from({ length: grid }).map((_) => (
                <span className={cn('h-4 w-3 rounded-xs', active ? 'bg-primary' : 'bg-neutral-400')}></span>
            ))}
        </Button>
    );
}
