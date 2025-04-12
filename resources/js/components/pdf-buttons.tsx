// resources/js/Components/Order/PdfButtons.tsx

import { downloadOrderPdf, viewOrderPdf } from '@/services/pdfServices';
import React, { useState } from 'react';

interface PdfButtonsProps {
    orderId: string;
    className?: string;
}

const PdfButtons: React.FC<PdfButtonsProps> = ({ orderId, className = '' }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
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
        <div className={className}>
            {error && <div className="mb-2 text-sm text-red-600">{error}</div>}
            <div className="flex space-x-2">
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`flex items-center rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 ${
                        isDownloading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                >
                    {isDownloading ? (
                        <>
                            <svg
                                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Downloading...
                        </>
                    ) : (
                        <>
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            Download PDF
                        </>
                    )}
                </button>

                <button
                    onClick={handleView}
                    disabled={isViewing}
                    className={`flex items-center rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 ${
                        isViewing ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                >
                    {isViewing ? (
                        <>
                            <svg
                                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Opening...
                        </>
                    ) : (
                        <>
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            View PDF
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PdfButtons;
