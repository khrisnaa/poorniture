import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
    return (
        <div className="relative flex min-h-screen items-stretch justify-between pb-[10dvh]">
            <div className="flex max-w-xs flex-col justify-end gap-8">
                <p className="text-justify text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem modi ex ut soluta rerum alias facilis recusandae molestias, nam
                    voluptatibus esse quidem aliquid harum. Sint harum nisi nulla sequi a!
                </p>
                <Link href="#" className="group flex items-center gap-1 text-sm font-semibold">
                    <span className="underline">Order Now</span>{' '}
                    <ArrowRight className="size-4 -rotate-45 transition-all duration-300 group-hover:rotate-0" />
                </Link>
            </div>
            <div className="relative z-50 w-full -translate-x-[5dvw] translate-y-[5dvh]">
                <h4 className="max-w-[40rem] text-8xl font-bold">
                    Quality is our <span className="text-secondary">guiding</span> prin<span className="text-secondary">ciple.</span>
                </h4>
                <div className="bg-primary absolute top-[5dvh] -left-[16dvw] h-[50dvh] w-3" />
            </div>
            <div className="absolute -right-[10dvw] bottom-[10dvh] aspect-video w-[60dvw]">
                <img src="/asset/sofa_living_room.png" className="h-full w-full object-cover" />
                <div className="absolute right-[2dvw] bottom-[5dvh] z-50">
                    <h4 className="text-secondary text-xl font-bold">Poorniture</h4>
                    <h4 className="text-secondary -translate-y-2 text-xl font-bold">Collection.</h4>
                </div>
            </div>
        </div>
    );
}
