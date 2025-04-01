import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PriceInputProps = {
    setData: (key: string, value: any) => void;
    data: { price: number | string }; // Bisa number atau string dari backend
    errors: { [key: string]: string | undefined };
};

export default function PriceInput({ errors, setData, data }: PriceInputProps) {
    // Pastikan price tetap dalam format angka bulat saat diinputkan dari backend
    const normalizedPrice = typeof data.price === 'string' ? parseFloat(data.price) : data.price;

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\./g, ''); // Hapus titik pemisah ribuan
        const numericValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
        setData('price', isNaN(numericValue) ? 0 : numericValue);
    };

    const formatPrice = (value: number) => {
        return value.toLocaleString('id-ID'); // Format angka ke '2.000.000'
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative flex items-center">
                <Input
                    id="price"
                    type="text"
                    name="price"
                    value={normalizedPrice ? formatPrice(normalizedPrice) : ''}
                    onChange={handlePriceChange}
                    placeholder="0"
                    className="flex-1 pl-12"
                />
                <span className="absolute left-4 text-sm text-gray-600">IDR</span>
            </div>
            <InputError message={errors.price} />
        </div>
    );
}
