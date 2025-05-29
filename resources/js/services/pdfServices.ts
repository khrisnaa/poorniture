// resources/js/Services/pdfService.ts

export const downloadOrderPdf = async (orderId: string) => {
    try {
        const response = await fetch(`/orders/${orderId}/pdf/download`);

        if (!response.ok) {
            throw new Error('Failed to download PDF');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${orderId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('PDF download error:', error);
        throw error;
    }
};

export const viewOrderPdf = (orderId: string) => {
    window.open(`/orders/${orderId}/pdf/stream`, '_blank');
};
