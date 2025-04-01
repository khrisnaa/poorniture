import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

type ImagesUploadProps = {
    setData: (key: string, value: any) => void;
    errors: { [key: string]: string | undefined };
    data: { images: File[] };
};

export default function ImagesUpload({ data, setData, errors }: ImagesUploadProps) {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            const updatedFiles = [...(data.images || []), ...newFiles];
            setData('images', updatedFiles);

            // Create new previews
            const newPreviews: string[] = [];
            newFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    if (newPreviews.length === newFiles.length) {
                        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);

        const newFiles = [...(data.images || [])];
        newFiles.splice(index, 1);
        setData('images', newFiles);

        if (newFiles.length === 0) {
            setImagePreviews([]);
            const fileInput = document.getElementById('images') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
        }
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor="images">Product Images</Label>
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Input
                        id="images"
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-4 text-gray-600 hover:bg-gray-200">
                        <Upload className="h-4 w-4" /> <span className="text-sm font-semibold">Upload Images</span>
                    </div>
                </div>
                {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative">
                                <img src={preview} alt={`Image Preview ${index + 1}`} className="h-36 w-36 rounded-md border object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="text-secondary absolute top-1 right-1 cursor-pointer rounded-full bg-black/30 p-1"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <InputError message={errors.images} />
        </div>
    );
}
