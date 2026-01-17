import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutMe } from '../data/projects';

export const TechStack: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('Languages');

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
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
                    <p className="text-muted-foreground">My weapons of choice for building digital experiences.</p>
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
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-6 py-3 bg-card/50 backdrop-blur-md border border-white/10 rounded-xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-default group"
                                >
                                    <span className="text-lg text-gray-200 group-hover:text-purple-300 transition-colors">
                                        {skill}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
