import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ImagesUploadProps = {
    setData: (key: string, value: any) => void;
    errors: { [key: string]: string | undefined };
    data: { images: File[] };
    defaultImages?: string[];
    onRemainingImagesChange?: (remainingUrls: string[]) => void;
};

export default function ImagesUpload({ data, onRemainingImagesChange, setData, errors, defaultImages }: ImagesUploadProps) {
    const [remainingDefaultImages, setRemainingDefaultImages] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [removedDefaultImages, setRemovedDefaultImages] = useState<string[]>([]);
    const prevRemainingRef = useRef<string[]>([]);

    useEffect(() => {
        if (defaultImages) {
            setRemainingDefaultImages(defaultImages);
            prevRemainingRef.current = defaultImages;
        }
    }, []); // Empty dependency array

    // Gunakan useEffect dengan comparison untuk menghindari loop
    useEffect(() => {
        if (!onRemainingImagesChange || JSON.stringify(prevRemainingRef.current) === JSON.stringify(remainingDefaultImages)) {
            return;
        }

        onRemainingImagesChange(remainingDefaultImages);
        prevRemainingRef.current = remainingDefaultImages;
    }, [remainingDefaultImages, onRemainingImagesChange]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            const updatedFiles = [...uploadedImages, ...newFiles];
            setUploadedImages(updatedFiles);
            setData('images', updatedFiles);
        }
    };

    const handleRemoveImage = (index: number, isDefault: boolean = false) => {
        if (isDefault) {
            // Handle default image removal
            const imageToRemove = remainingDefaultImages[index];
            setRemovedDefaultImages((prev) => [...prev, imageToRemove]);

            const newDefaultImages = remainingDefaultImages.filter((_, i) => i !== index);
            setRemainingDefaultImages(newDefaultImages);
            // if (setRemainingImages) {
            //     setRemainingImages(removedDefaultImages);
            // }
        } else {
            // Handle uploaded image removal
            const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
            setUploadedImages(newUploadedImages);
            setData('images', newUploadedImages);
        }
    };

    // Filter out any default images that have been removed
    const filteredDefaultImages = remainingDefaultImages.filter((img) => !removedDefaultImages.includes(img));

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

                {/* Display remaining default images */}
                {(filteredDefaultImages.length > 0 || uploadedImages.length > 0) && (
                    <div className="flex flex-wrap gap-4">
                        {filteredDefaultImages.map((preview, index) => (
                            <div key={`default-${index}`} className="relative">
                                <img
                                    src={`/storage/${preview}`}
                                    alt={`Default Image Preview ${index + 1}`}
                                    className="h-36 w-36 rounded-md border object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index, true)}
                                    className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/30 p-1 text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        {uploadedImages.map((file, index) => (
                            <div key={`uploaded-${index}`} className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded Image Preview ${index + 1}`}
                                    className="h-36 w-36 rounded-md border object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/30 p-1 text-white"
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
