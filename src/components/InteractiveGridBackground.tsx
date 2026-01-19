import React, { useEffect, useRef } from 'react';

export const InteractiveGridBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

        const gridSize = 40;
        // Store fading active cells: {x, y, opacity}
        let activeCells: number[][] = [];

        const handleResize = () => {
            width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const col = Math.floor(x / gridSize);
            const row = Math.floor(y / gridSize);

            const existing = activeCells.find(c => c[0] === col && c[1] === row);
            if (existing) {
                existing[2] = 1; // Reset opacity
            } else {
                activeCells.push([col, row, 1]); // [col, row, opacity]
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Draw Grid Lines (faint)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();

            // Draw Active Cells
            activeCells.forEach((cell, index) => {
                const [col, row, opacity] = cell;
                const x = col * gridSize;
                const y = row * gridSize;

                ctx.fillStyle = `rgba(147, 51, 234, ${opacity * 0.2})`; // Purple with fading opacity
                ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2); // Slight inset

                // Decay opacity
                cell[2] -= 0.02; // Fade speed

                // Remove dead cells
                if (cell[2] <= 0) {
                    activeCells.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full pointer-events-auto"
            style={{ pointerEvents: 'none' }}
        />
    );
};
