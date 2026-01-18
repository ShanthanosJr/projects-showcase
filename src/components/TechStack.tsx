import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutMe } from '../data/projects';
import { fetchGithubStats, type GithubStats } from '../utils/github';
import { GitCommit, BookMarked, Calendar } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { InteractiveGridBackground } from './InteractiveGridBackground';

// Define related skills for the "Constellation" effect
const RELATED_SKILLS: Record<string, string[]> = {
    "React": ["JavaScript", "TypeScript", "TailwindCSS", "Node.js"],
    "Node.js": ["JavaScript", "Express.js", "MongoDB", "React"],
    "MongoDB": ["Node.js", "Express.js"],
    "TypeScript": ["JavaScript", "React", "Node.js"],
    "TailwindCSS": ["React", "CSS"],
    // Add more mappings as needed
};

const SkillCard: React.FC<{
    skill: string;
    index: number;
    hoveredSkill: string | null;
    setHoveredSkill: (skill: string | null) => void;
}> = ({ skill, hoveredSkill, setHoveredSkill }) => {

    // Determine state:
    // - Default: opacity 1
    // - Hovering this card: opacity 1, highlight
    // - Hovering connected card: opacity 1, highlight
    // - Hovering unrelated card: opacity 0.3 (dimmed)

    const isHovered = hoveredSkill === skill;
    // Check if THIS skill is in the related list of the HOVERED skill
    const isConnected = hoveredSkill && RELATED_SKILLS[hoveredSkill]?.some(s => s === skill);
    const isDimmed = hoveredSkill && !isHovered && !isConnected;

    return (
        <TiltCard className={`h-full ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'} transition-all duration-300`}>
            <div
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`relative px-6 py-3 bg-card/50 backdrop-blur-md border rounded-xl transition-colors cursor-crosshair group overflow-hidden
                    ${isHovered || isConnected ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/30'}
                `}
            >
                <span className={`relative z-10 text-lg transition-colors ${isHovered || isConnected ? 'text-purple-300 font-semibold' : 'text-gray-200'}`}>
                    {skill}
                </span>
            </div>
        </TiltCard>
    );
};

export const TechStack: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('Languages');
    const [githubStats, setGithubStats] = useState<GithubStats | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useEffect(() => {
        fetchGithubStats('ShanthanosJr').then(setGithubStats);
    }, []);

    const categories = [
        { name: 'Languages', items: aboutMe.skills.languages },
        { name: 'Frontend', items: aboutMe.skills.frontend },
        { name: 'Backend', items: aboutMe.skills.backend },
        { name: 'Database', items: aboutMe.skills.database },
        { name: 'Tools', items: aboutMe.skills.tools },
    ];

    const activeSkills = categories.find(c => c.name === activeTab)?.items || [];

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <InteractiveGridBackground />
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
                    <p className="text-muted-foreground mb-6">My weapons of choice for building digital experiences.</p>

                    {/* Live GitHub Stats */}
                    {githubStats && (
                        <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <BookMarked className="w-3.5 h-3.5 text-purple-400" />
                                <span>{githubStats.publicRepos} Public Repos</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                                <span>Active Since {new Date(githubStats.createdAt).getFullYear()}</span>
                            </div>
                            {githubStats.lastPush && (
                                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                    <GitCommit className="w-3.5 h-3.5 text-purple-400" />
                                    <span>Last Push: {new Date(githubStats.lastPush).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveTab(category.name)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTab === category.name
                                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/50'
                                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Skills Display */}
                <div className="min-h-[200px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            {activeSkills.map((skill, index) => (
                                <SkillCard
                                    key={skill}
                                    skill={skill}
                                    index={index}
                                    hoveredSkill={hoveredSkill}
                                    setHoveredSkill={setHoveredSkill}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
