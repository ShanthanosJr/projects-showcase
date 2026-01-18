import { useRef, useState, useEffect } from 'react';

export const useMousePosition = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ref.current.style.setProperty('--x', `${x}px`);
            ref.current.style.setProperty('--y', `${y}px`);
            setOpacity(1);
        };

        const handleMouseLeave = () => {
            setOpacity(0);
        };

        const element = ref.current;
        if (element) {
            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (element) {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return { ref, opacity };
};
