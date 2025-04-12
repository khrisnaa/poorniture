<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class OrderPdfController extends Controller
{
    public function download(Order $order)
    {
        // Eager load relationships with proper case
        $order->load(['user', 'items.product']);

        $pdf = Pdf::loadView('pdf.order', [
            'order' => $order,
            'user' => $order->user,
            'items' => $order->items,
        ]);

        // Use the correct header for download
        return $pdf->download("order-{$order->id}.pdf");
    }

    public function stream(Order $order)
    {
        // Eager load relationships
        $order->load(['user', 'items.product']);

        $pdf = Pdf::loadView('pdf.order', [
            'order' => $order,
            'user' => $order->user,
            'items' => $order->items,
        ]);

        // Stream the PDF with proper headers
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="order-' . $order->id . '.pdf"');
    }
}
