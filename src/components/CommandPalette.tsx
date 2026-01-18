import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { projects, type Project } from '../data/projects';
import { Search, FileCode, Github, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
    onSelectProject: (project: Project) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onSelectProject }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText('kavishka@example.com'); // Replace with actual email if available
        setOpen(false);
        // Could add a toast notification here
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative z-50"
                    >
                        <Command className="w-full">
                            <div className="flex items-center border-b border-white/10 px-4">
                                <Search className="w-5 h-5 text-muted-foreground mr-2" />
                                <Command.Input
                                    autoFocus
                                    placeholder="Type a command or search..."
                                    className="w-full h-14 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                                />
                            </div>

                            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                                <Command.Empty className="py-6 text-center text-muted-foreground text-sm">
                                    No results found.
                                </Command.Empty>

                                <Command.Group heading="Projects" className="mb-2 text-xs font-medium text-muted-foreground px-2">
                                    {projects.map((project) => (
                                        <Command.Item
                                            key={project.id}
                                            onSelect={() => {
                                                onSelectProject(project);
                                                setOpen(false);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white transition-colors"
                                        >
                                            <FileCode className="w-4 h-4 text-purple-400" />
                                            <span>{project.title}</span>
                                        </Command.Item>
                                    ))}
                                </Command.Group>

                                <Command.Group heading="General" className="mb-2 text-xs font-medium text-muted-foreground px-2">
                                    <Command.Item
                                        onSelect={() => {
                                            window.open('https://github.com/ShanthanosJr', '_blank');
                                            setOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>Visit GitHub</span>
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={copyEmail}
                                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-foreground cursor-pointer data-[selected=true]:bg-white/10 data-[selected=true]:text-white transition-colors"
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span>Copy Email</span>
                                    </Command.Item>
                                </Command.Group>
                            </Command.List>

                            <div className="border-t border-white/10 px-4 py-2 text-xs text-muted-foreground flex justify-between items-center bg-white/5">
                                <span>Press ↵ to select</span>
                                <span>Type 'Projects' to filter</span>
                            </div>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
