import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        const pctX = (clientX / width) - 0.5;
        const pctY = (clientY / height) - 0.5;

        x.set(pctX);
        y.set(pctY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(20px)",
                }}
                className="relative z-10 h-full"
            >
                {children}
            </div>

            {/* Glare/Sheen Effect */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none rounded-xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0"
                style={{
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.3]),
                    backgroundPosition: useTransform(mouseX, [-0.5, 0.5], ["0% 0%", "100% 100%"]),
                }}
            />
        </motion.div>
    );
};
