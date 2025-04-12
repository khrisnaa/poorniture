import { viewOrderPdf } from '@/services/pdfServices';
import { EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface PdfButtonsProps {
    orderId: string;
    className?: string;
    variant?: 'outline' | 'default' | 'link' | 'destructive' | 'secondary' | 'ghost' | null | undefined;
}

export default function PdfStream({ orderId, className, variant = 'default' }: PdfButtonsProps) {
    const [isViewing, setIsViewing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleView = () => {
        setIsViewing(true);
        setError(null);
        try {
            viewOrderPdf(orderId);
        } catch (err) {
            setError('Failed to open PDF. Please try again.');
        } finally {
            setIsViewing(false);
        }
    };
    return (
        <Button variant={variant} disabled={isViewing} className={className} onClick={handleView}>
            <EyeIcon />
            View PDF
        </Button>
    );
}
