import { downloadOrderPdf } from '@/services/pdfServices';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface PdfButtonsProps {
    orderId: string;
    className?: string;
    variant?: 'outline' | 'default' | 'link' | 'destructive' | 'secondary' | 'ghost' | null | undefined;
}

export default function PdfDownload({ orderId, className, variant = 'default' }: PdfButtonsProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        setIsDownloading(true);
        setError(null);
        try {
            await downloadOrderPdf(orderId);
        } catch (err) {
            setError('Failed to download PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };
    return (
        <Button variant={variant} disabled={isDownloading} className={className} onClick={handleDownload}>
            <DownloadIcon />
            Download PDF
        </Button>
    );
}
