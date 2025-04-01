import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

type ThumbnailUploadProps = {
    setData: (key: string, value: any) => void;
    errors: { [key: string]: string | undefined };
};

export default function ThumbnailUpload({ setData, errors }: ThumbnailUploadProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setData('thumbnail', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData('thumbnail', null);
        setImagePreview(null);
        const fileInput = document.getElementById('thumbnail') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Input
                        id="thumbnail"
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-4 text-gray-600 hover:bg-gray-200">
                        <Upload className="h-4 w-4" /> <span className="text-sm font-semibold">Upload Thumbnail</span>
                    </div>
                </div>

                {imagePreview && (
                    <div className="relative w-fit">
                        <img src={imagePreview} alt="Image Preview" className="h-36 w-36 rounded-md border object-cover" />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="text-secondary absolute top-1 right-1 cursor-pointer rounded-full bg-black/30 p-1"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
            <InputError message={errors.thumbnail} />
        </div>
    );
}
