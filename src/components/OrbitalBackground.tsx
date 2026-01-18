import React from 'react';
import { motion } from 'framer-motion';

export const OrbitalBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Orb 1: Purple/Pink */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[10%] left-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
            />

            {/* Orb 2: Blue/Cyan */}
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
            />

            {/* Orb 3: Gold/Yellow (Accent) */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                className="absolute bottom-[10%] left-[30%] w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px]"
            />
        </div>
    );
};
