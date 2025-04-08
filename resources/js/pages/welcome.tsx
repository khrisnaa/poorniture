import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';
import { ArrowDown } from 'lucide-react';

export default function Welcome() {
    return (
        <ClientLayout>
            <Head title="Home" />
            <div>
                <section className="relative flex min-h-[calc(100vh-64px)] flex-col">
                    <div className="flex h-full max-h-[calc(45vh-32px)] flex-1 flex-col justify-center">
                        <div className="font-inter flex gap-24 text-sm">
                            <p className="max-w-40">We believe that good design should be easy to accept</p>
                            <p className="max-w-32">Furniture Design Since 1990</p>
                        </div>
                    </div>
                    <div className="z-[1] flex h-full max-h-[calc(55vh-32px)] flex-1 flex-col justify-end">
                        <Badge variant="outline" className="rounded-full px-4 py-2">
                            Reliable Carpenter
                        </Badge>
                        <div className="flex w-fit flex-1 flex-col">
                            <h2 className="text-[9rem] leading-none font-bold">Poorniture</h2>
                            <h2 className="text-[9rem] leading-none font-bold">Store</h2>
                        </div>
                    </div>

                    {/* Circle Button */}
                    <div className="absolute bottom-[10dvh] left-1/2 z-10 -translate-x-1/2">
                        <ScrollButton />
                    </div>

                    {/* Hero Image */}
                    <div className="absolute top-[10dvh] -right-[8dvw] z-[2]">
                        <div className="absolute top-[8dvh] right-[14dvw] z-10 w-fit">
                            <InfoDot text="Matte Black Finish" />
                        </div>
                        <div className="absolute top-[28dvh] left-[12dvw] z-10 w-fit">
                            <InfoDot text="Soft-Touch Linen Fabric" />
                        </div>
                        <div className="absolute top-[40dvh] right-[16dvw] z-10 w-fit">
                            <InfoDot text="Ergonomic Curved Backrest" />
                        </div>
                        <div className="relative size-[40dvw]">
                            <div className="absolute top-[10dvh] -left-[5dvw] flex items-center gap-4">
                                <div className="bg-primary text-secondary p-3">
                                    <h4 className="text-sm">Matte Black Chair</h4>
                                </div>

                                <div className="bg-primary h-0.5 w-16" />
                            </div>

                            <img src="/asset/hero_chair.png" alt="Hero Image" className="h-full w-full object-contain" />
                        </div>
                    </div>
                </section>
            </div>
        </ClientLayout>
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
                    {/* Lingkaran Glow */}
                    <div className="absolute size-6 animate-pulse rounded-full border-[6px] border-white bg-white opacity-30" />
                    {/* Dot Tengah */}
                    <div className="z-[1] size-2 rounded-full bg-white" />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
};
