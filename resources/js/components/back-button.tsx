import { router } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

export default function BackButton({ link }: { link: string }) {
    return (
        <div className="py-4">
            <Button variant="link" className="h-8 gap-1 text-xs" onClick={() => router.get(route(link))}>
                <ChevronLeft />
                Back
            </Button>
        </div>
    );
}
