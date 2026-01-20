import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type Project } from '../data/projects';
import { X, Github, ChevronLeft, ChevronRight, Play, CheckCircle } from 'lucide-react';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { VideoPlayer } from './VideoPlayer';

interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>('overview');

    // Reset state when project changes
    React.useEffect(() => {
        setCurrentImageIndex(0);
        setShowVideo(false);
        setActiveTab('overview');
    }, [project]);

    if (!project) return null;

    const nextImage = () => {
        setShowVideo(false);
        setCurrentImageIndex((prev) =>
            prev === (project.assets.images.length - 1) ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setShowVideo(false);
        setCurrentImageIndex((prev) =>
            prev === 0 ? (project.assets.images.length - 1) : prev - 1
        );
    };

    return (
        <React.Fragment>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
                <motion.div
                    layoutId={`card-${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-card w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row relative shadow-2xl shadow-purple-900/20"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Media Section - Only show on Overview or if desktop layout allows split view. 
                        For simplicity, we keep it on left side always, or maybe hide it on Architecture tab if space is needed.
                        Let's keep it visible for context. */}
                    <div className="w-full md:w-3/5 bg-black/50 relative group flex items-center justify-center bg-gray-900 min-h-[300px]">
                        {/* ... existing media rendering code ... */}
                        {showVideo && project.assets.video ? (
                            <div className="w-full h-full flex items-center justify-center bg-black relative">
                                <button
                                    onClick={() => setShowVideo(false)}
                                    className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-3 h-3" /> Back to Images
                                </button>
                                <VideoPlayer
                                    src={project.assets.video}
                                    autoPlay
                                />
                            </div>
                        ) : project.assets.images.length > 0 ? (
                            <div className="relative w-full h-[300px] md:h-full">
                                <img
                                    src={project.assets.images[currentImageIndex]}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain"
                                />

                                {project.assets.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {project.assets.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setCurrentImageIndex(idx);
                                                        setShowVideo(false);
                                                    }}
                                                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex && !showVideo ? 'bg-white' : 'bg-white/30'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="text-muted-foreground">No media available</div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-2/5 p-8 overflow-y-auto bg-card flex flex-col">
                        <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'overview' ? 'text-purple-400' : 'text-muted-foreground hover:text-white'}`}
                            >
                                Overview
                                {activeTab === 'overview' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('architecture')}
                                className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'architecture' ? 'text-purple-400' : 'text-muted-foreground hover:text-white'}`}
                            >
                                Architecture
                                {activeTab === 'architecture' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />}
                            </button>
                        </div>

                        {activeTab === 'overview' ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                <div className="mb-6">
                                    <span className="text-sm text-purple-400 font-medium mb-2 block">{project.type}</span>
                                    <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/5 text-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {project.features && project.features.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Key Features</h3>
                                        <div className="space-y-2">
                                            {project.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                <h3 className="text-xl font-bold mb-4">System Architecture</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    A high-level overview of the system's data flow and component interaction.
                                </p>
                                <ArchitectureDiagram />
                            </motion.div>
                        )}

                        <div className="flex gap-4 mt-auto pt-6 border-t border-white/10">
                            {project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                                    <Github className="w-4 h-4" /> View Code
                                </a>
                            )}
                            {project.assets.video && (
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors border ${showVideo ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                >
                                    <Play className="w-4 h-4" /> {showVideo ? 'Playing Demo' : 'Watch Demo'}
                                </button>
                            )}
                        </div>

                        {project.repoType === 'Private' && (
                            <p className="mt-6 text-xs text-muted-foreground text-center italic">
                                This project is in a private repository. Code access available upon request.
                            </p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </React.Fragment>
    );
};
