<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Invoice-{{ substr($order->id, 0, 8) }}</title>
    <style>
        /* General reset and styling */
        body {
            font-size: 14px !important;
            line-height: 1.6 !important;
            background-color: #f9fafb !important;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 28px;
            color: #1f2937;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .header p {
            font-size: 14px;
            color: #6b7280;
        }

        .info {
            background-color: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }

        .info h3 {
            font-size: 16px;
            color: #1f2937;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .info p {
            margin: 8px 0;
            font-size: 14px;
            color: #4b5563;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        th,
        td {
            text-align: left;
            padding: 12px;
            font-size: 14px;
            border: 1px solid #e5e7eb;
        }

        th {
            background-color: #f3f4f6;
            color: #1f2937;
            font-weight: 600;
        }

        td {
            background-color: #ffffff;
            color: #4b5563;
        }

        .status {
            font-weight: 600;
            text-transform: capitalize;
            padding: 4px 12px;
            border-radius: 4px;
        }

        .status-pending {
            background-color: #fff3cd;
            color: #856404;
        }

        .status-completed {
            background-color: #d4edda;
            color: #155724;
        }

        .status-canceled {
            background-color: #f8d7da;
            color: #721c24;
        }

        .total {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-top: 20px;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #6b7280;
        }

        .footer p {
            margin: 0;
        }

        .footer a {
            color: #4b5563;
            text-decoration: none;
            margin-top: 10px;
            display: block;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Invoice-{{ substr($order->id, 0, 8) }}</h1>
            <p>Date: {{ $order->created_at->format('d/m/Y H:i') }}</p>
            <p>Status: <span class="status status-{{ $order->status }}">{{ ucfirst($order->status) }}</span></p>
        </div>

        <div class="info">
            <h3>Customer Information</h3>
            <p>Name: {{ $user->name }}</p>
            <p>Email: {{ $user->email }}</p>
            @if($user->phone)<p>Phone: {{ $user->phone }}</p>@endif
            @if($order->address)<p>Address: {{ $order->address }}</p>@endif
        </div>

        <h3>Order Items</h3>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($items as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->product->name }}</td>
                    <td>{{ number_format($item->product->price, 2) }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format($item->subtotal, 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="total">
            <p>Total Price: {{ number_format($order->total_price, 2) }}</p>
        </div>

        <div class="footer">
            <p>Generated on {{ now()->format('d/m/Y H:i') }}</p>
        </div>
    </div>
</body>

</html>