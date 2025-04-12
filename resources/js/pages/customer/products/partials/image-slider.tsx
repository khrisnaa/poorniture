import { Button } from '@/components/ui/button';
import { ProductImage } from '@/types/model';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

// const images = [
//     {
//         id: 'item-1',
//         image_url: '/furniture/calia-1.png',
//     },
//     {
//         id: 'item-2',
//         image_url: '/furniture/calia-2.png',
//     },
//     {
//         id: 'item-3',
//         image_url: '/asset/black_chair.webp',
//     },
// ];

interface ImageSliderProps {
    images: ProductImage[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className={`flex h-full w-full items-center justify-center px-4 transition-colors duration-300`}>
            <div className="relative flex h-full max-h-[600px] w-full max-w-[800px] flex-col items-center justify-center">
                {/* Cards */}
                <div className="relative mb-5 h-full w-full">
                    {images.map((image, index) => {
                        let positionClass = index === currentIndex ? 'translate-x-0 scale-100 opacity-100 z-10 ' : 'scale-80 opacity-0 z-0 ';

                        if ((currentIndex + 1) % images.length === index) {
                            positionClass += ' translate-x-[60%] opacity-40 scale-[50%]';
                        } else if ((currentIndex - 1 + images.length) % images.length === index) {
                            positionClass += ' -translate-x-[60%] scale-[50%]';
                        }

                        return (
                            <div
                                key={image.id}
                                className={`absolute right-0 left-0 mx-auto h-full max-h-[80dvh] w-[60%] transition-all duration-300 ease-in-out ${positionClass}`}
                            >
                                <img src={`/storage/${image.image_url}`} alt="slider" className="h-full w-full rounded-lg object-cover" />
                            </div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="absolute right-0 bottom-32 flex gap-4">
                    <Button variant="link" onClick={nextSlide}>
                        Next{' '}
                        <span className="border-primary rounded-full border p-2">
                            <ArrowRight className="size-3" />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
