import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCarouselProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const getProjectIndex = (offset: number) => {
        return (currentIndex + offset + projects.length) % projects.length;
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto h-[500px] flex items-center justify-center perspective-1000">
            {/* Navigation Buttons */}
            <button
                onClick={prevProject}
                className="absolute left-0 md:-left-12 z-30 p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/20 transition-all backdrop-blur-md"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextProject}
                className="absolute right-0 md:-right-12 z-30 p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/20 transition-all backdrop-blur-md"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Track */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode='popLayout'>
                    {[-1, 0, 1].map((offset) => {
                        const projectIndex = getProjectIndex(offset);
                        const project = projects[projectIndex];
                        const isActive = offset === 0;

                        return (
                            <motion.div
                                key={`${project.id}-${offset}`}
                                initial={{
                                    opacity: 0,
                                    x: offset * 100 + '%',
                                    scale: 0.8,
                                    zIndex: 0
                                }}
                                animate={{
                                    opacity: isActive ? 1 : 0.4,
                                    x: offset === 0 ? '0%' : offset === -1 ? '-55%' : '55%',
                                    scale: isActive ? 1 : 0.85,
                                    zIndex: isActive ? 20 : 10,
                                    rotateY: offset === -1 ? 15 : offset === 1 ? -15 : 0
                                }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
                                className={`absolute top-0 w-full md:w-[60%] h-full ${isActive ? 'cursor-default pointer-events-auto' : 'cursor-pointer pointer-events-auto'}`}
                                onClick={() => !isActive ? (offset === -1 ? prevProject() : nextProject()) : null}
                            >
                                <div className={`w-full h-full transition-all duration-500 ${!isActive && 'blur-[2px] hover:blur-none'}`}>
                                    <ProjectCard
                                        project={project}
                                        index={projectIndex}
                                        onClick={() => isActive && onProjectClick(project)}
                                        isCarouselItem={true}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};
