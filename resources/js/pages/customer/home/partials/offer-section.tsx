import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function OfferSection() {
    return (
        <div className="relative min-h-screen">
            <div
                className="pointer-events-none absolute inset-0 -left-[calc((100dvw-100%)/2)] h-screen w-screen bg-cover bg-fixed bg-center sm:-left-[calc((100dvw-100%+16px)/2)]"
                style={{ backgroundImage: "url('/asset/sofa_right.png')" }}
            >
                <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="relative z-50 flex h-screen flex-col justify-center gap-16">
                <h2 className="text-secondary text-9xl font-bold">
                    Give your space <br /> a special <br /> touch!
                </h2>
                <Button variant="secondary" className="w-fit rounded-full !px-6 py-5 text-xs font-semibold">
                    Shop Now <ArrowRight className="-rotate-45" />
                </Button>

                <div className="absolute right-[5dvw] bottom-[25dvh] max-w-56">
                    <h4 className="text-8xl font-bold text-white/20 italic">10%</h4>
                    <p className="text-secondary text-xs italic">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore aliquid reiciendis accusamus adipisci
                    </p>
                </div>
            </div>
        </div>
    );
}
