import React from 'react';
import { aboutMe } from '../data/projects';

export const Footer: React.FC = () => {
    return (
        <footer className="py-8 text-center text-muted-foreground text-sm border-t border-white/5 bg-black/20">
            <p>© {new Date().getFullYear()} {aboutMe.name}. All rights reserved.</p>
            <p className="mt-2 text-xs opacity-60">Designed & Built with React + Tailwind CSS</p>
        </footer>
    );
};
