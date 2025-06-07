import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function OfferSection() {
    return (
        <div className="bg-primary relative min-h-screen">
            <div
                className="pointer-events-none absolute inset-0 -left-[calc((100dvw-100%)/2)] h-screen w-screen bg-cover bg-fixed bg-center sm:-left-[calc((100dvw-100%+16px)/2)]"
                style={{ backgroundImage: "url('/asset/empty_room.webp')" }}
            >
                <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="relative z-10 flex h-screen flex-col justify-center gap-16">
                <h1 className="text-secondary text-6xl font-bold md:text-9xl">
                    Give your space <br /> a special <br /> touch!
                </h1>
                <Button variant="secondary" className="w-fit rounded-full !px-6 py-5 text-xs font-semibold">
                    Shop Now <ArrowRight className="-rotate-45" />
                </Button>

                <div className="absolute -right-[7dvw] bottom-[25dvh] max-w-56">
                    <p className="text-5xl font-bold text-white/40 italic md:text-8xl">10%</p>
                    <p className="text-xs text-neutral-200 italic">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore aliquid reiciendis accusamus adipisci
                    </p>
                </div>
            </div>
        </div>
    );
}
