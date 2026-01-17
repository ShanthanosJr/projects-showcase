import React from 'react';
import { motion } from 'framer-motion';
import { type Project } from '../data/projects';
import { Lock, Globe, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
    index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onClick(project)}
            className="group bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300 hover:bg-card/60 flex flex-col h-full"
        >
            <div className="relative h-48 overflow-hidden">
                {project.assets.images[0] ? (
                    <img
                        src={project.assets.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-muted-foreground">
                        No Image
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs border border-white/10 flex items-center gap-1.5">
                    {project.repoType === 'Private' ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                    {project.repoType}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5 text-gray-300">
                            {tech}
                        </span>
                    ))}
                    {project.stack.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5 text-gray-300">
                            +{project.stack.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex items-center text-sm font-medium text-purple-400 group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </motion.div>
    );
};
