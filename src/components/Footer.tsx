import React from 'react';
import { aboutMe } from '../data/projects';

export const Footer: React.FC = () => {
    return (
        <footer className="py-8 text-center text-muted-foreground text-sm relative border-t border-white/5 bg-black/20 overflow-hidden">
            {/* Cyber Horizon Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[2px] animate-pulse" />

            <p className="relative z-10">© {new Date().getFullYear()} {aboutMe.name}. All rights reserved.</p>
            <p className="mt-2 text-xs opacity-60 relative z-10">Designed & Built with React + Tailwind CSS</p>
        </footer>
    );
};
