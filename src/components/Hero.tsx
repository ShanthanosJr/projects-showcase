import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe, socialLinks } from '../data/projects';
import { Github, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-20">
            {/* Background gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-6 text-purple-300">
                        Portfolio Showcase
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                        {aboutMe.name}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 text-balance">
                        {aboutMe.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        {aboutMe.description}
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-20">
                        <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5 group"
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
                        </a>
                        <a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5 group"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
                        </a>
                        <a
                            href={socialLinks.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
                        >
                            Visit Portfolio <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
            >
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
};
