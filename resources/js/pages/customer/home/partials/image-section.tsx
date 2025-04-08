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
    const scale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
    return (
        <div
            ref={container}
            className="relative flex h-screen items-center justify-center overflow-hidden"
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
            <div className="absolute top-[10dvh] left-[2dvw] z-50">
                <h4 className="text-secondary text-xl font-bold">Poorniture</h4>
                <h4 className="text-secondary -translate-y-2 text-xl font-bold">Collection.</h4>
            </div>
            <div className="absolute right-[2dvw] bottom-[10dvh] z-50">
                <h4 className="text-secondary max-w-xl text-end text-7xl font-bold tracking-normal">Designing Spaces, Defining Comfort.</h4>
            </div>

            <div className="absolute z-50">
                <AppLogoIcon className="text-secondary/30 size-64" />
            </div>
            {/* <div className="absolute bottom-0 left-0 z-50">
                <div className="size-96">
                    <img src="/asset/black_chair.png" className="h-full w-full object-contain" />
                </div>
            </div> */}

            <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
                <motion.div style={{ y, scale }} className="relative h-full w-full">
                    <img src="/asset/main_sofa.png" alt="image" className="h-full w-full" style={{ objectFit: 'cover' }} />
                </motion.div>
                <div className="absolute inset-0 bg-black/30" />
            </div>
        </div>
    );
}
