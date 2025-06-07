import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
    return (
        <div className="relative flex min-h-screen items-stretch justify-between pb-[10dvh]">
            <div className="flex max-w-xs flex-col justify-end gap-8">
                <p className="hidden text-justify text-sm md:block md:max-w-sm xl:max-w-full">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem modi ex ut soluta rerum alias facilis recusandae molestias, nam
                    voluptatibus esse quidem aliquid harum. Sint harum nisi nulla sequi a!
                </p>
                <Link href="#" className="group flex items-center gap-1 text-sm font-semibold">
                    <span className="text-nowrap underline">Order Now</span>{' '}
                    <ArrowRight className="size-4 -rotate-45 transition-all duration-300 group-hover:rotate-0" />
                </Link>
            </div>

            <div className="relative z-10 w-full -translate-x-[5dvw] translate-y-[5dvh] md:-translate-x-[20dvw] xl:-translate-x-[5dvw]">
                <h1 className="max-w-[40rem] text-6xl font-bold md:text-8xl">
                    Quality is our <span>guiding</span> prin<span className="md:text-white">ciple.</span>
                </h1>
                <div className="bg-primary absolute top-[5dvh] -left-[16dvw] h-[50dvh] w-3 md:-left-[10dvw] xl:-left-[16dvw]" />
            </div>

            <div className="absolute -right-[calc((100dvw-100%-16px)/2)] bottom-[20dvh] h-[60dvh] w-[100dvw] md:bottom-[10dvh] md:aspect-video md:w-[60dvw]">
                <img alt="Image" src="/asset/sofa_right.webp" className="h-full w-full object-cover" />
                <div className="absolute right-[2dvw] bottom-[5dvh] z-50">
                    <p className="text-secondary text-xl font-bold">Poorniture</p>
                    <p className="text-secondary -translate-y-2 text-xl font-bold">Collection.</p>
                </div>
            </div>
        </div>
    );
}
