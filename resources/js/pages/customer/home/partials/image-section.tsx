import AppLogoIcon from '@/components/app-logo-icon';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function ImageSection() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh']);
    const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    return (
        <div
            ref={container}
            className="bg-primary relative flex h-screen items-center justify-center overflow-hidden"
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
            <div className="absolute top-[10dvh] left-[2dvw] z-10">
                <p className="text-secondary text-xl font-bold">Poorniture</p>
                <p className="text-secondary -translate-y-2 text-xl font-bold">Collection.</p>
            </div>
            <div className="absolute right-[2dvw] bottom-[10dvh] z-10">
                <h2 className="text-secondary hei max-w-xl text-center text-6xl font-bold tracking-normal md:text-end md:text-7xl">
                    Designing Spaces, Defining Comfort.
                </h2>
            </div>

            <div className="absolute z-10">
                <AppLogoIcon className="text-secondary/30 size-64" />
            </div>
            <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
                <motion.div style={{ y, scale }} className="relative h-full w-full">
                    <img src="/asset/main_sofa.webp" alt="Image" className="h-full w-full" style={{ objectFit: 'cover' }} />
                </motion.div>
                <div className="absolute inset-0 bg-black/30" />
            </div>
        </div>
    );
}
