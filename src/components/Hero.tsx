import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe, socialLinks } from '../data/projects';
import { Github, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';
import { useScrambleText } from '../hooks/useScrambleText';
import { ParticleBackground } from './ParticleBackground';

export const Hero: React.FC = () => {
    const scrambledTitle = useScrambleText(aboutMe.title);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-20">
            {/* Particle Force Field Background */}
            <ParticleBackground />

            {/* Background gradients */}
            {/* Aurora Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
            </div>

            <div className="max-w-4xl mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-6 text-purple-300">
                        Project Showcase
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                        {aboutMe.name}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 text-balance font-mono">
                        {scrambledTitle}
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
