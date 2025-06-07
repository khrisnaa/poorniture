import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
    return (
        <div className="relative flex min-h-[calc(100vh-64px)] flex-col">
            <div className="flex h-full max-h-[calc(45vh-32px)] flex-1 flex-col justify-start pt-4 md:pt-8 xl:justify-center xl:pt-0">
                <div className="font-inter flex gap-24 text-sm">
                    <p className="max-w-40">We believe that good design should be easy to accept</p>
                    <p className="max-w-32">Furniture Design Since 1990</p>
                </div>
            </div>
            <div className="z-[1] flex h-full max-h-[calc(55vh-32px)] flex-1 flex-col justify-end pt-24 md:pt-36 xl:pt-0">
                <Badge variant="outline" className="rounded-full px-4 py-2">
                    Reliable Carpenter
                </Badge>
                <div className="flex w-fit flex-1 flex-col">
                    <h1 className="text-6xl leading-none font-bold md:text-9xl xl:text-[9rem]">Poorniture</h1>
                    <h2 className="text-6xl leading-none font-bold md:text-9xl xl:text-[9rem]">Collection.</h2>
                </div>
            </div>

            {/* Circle Button */}
            <div className="absolute right-0 bottom-[2dvh] z-10 md:-right-[3dvw] md:bottom-[10dvh]">
                <ScrollButton />
            </div>

            {/* Hero Image */}
            <div className="absolute top-[10dvh] -right-[8dvw] z-[2]">
                <div className="absolute top-[8dvh] z-[20] hidden w-fit md:right-[24dvw] md:block xl:right-[14dvw]">
                    <InfoDot text="Matte Black Finish" />
                </div>
                <div className="absolute top-[28dvh] z-[20] hidden w-fit md:left-[20dvw] md:block xl:left-[12dvw]">
                    <InfoDot text="Soft-Touch Linen Fabric" />
                </div>

                <div className="relative size-[90dvw] md:size-[80dvw] xl:size-[40dvw]">
                    <div className="absolute top-[10dvh] -left-[5dvw] flex items-center gap-4">
                        <div className="bg-primary text-secondary p-3">
                            <h3 className="text-sm">Matte Black Chair</h3>
                        </div>
                        <div className="bg-primary h-0.5 w-16" />
                    </div>
                    <img src="/asset/hero_chair.webp" alt="Hero Image" className="h-full w-full object-contain" />
                </div>
            </div>
        </div>
    );
}

const ScrollButton = () => {
    return (
        <Button variant="outline" className="size-16 rounded-full">
            <ArrowDown />
        </Button>
    );
};

const InfoDot = ({ text }: { text: string }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
                <div className="relative flex items-center justify-center">
                    <div className="absolute size-6 animate-pulse rounded-full border-[6px] border-white bg-white opacity-30" />
                    <div className="z-[1] size-2 rounded-full bg-white" />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
};
