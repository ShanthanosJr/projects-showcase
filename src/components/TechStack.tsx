import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe } from '../data/projects';

export const TechStack: React.FC = () => {
    const categories = [
        { name: 'Languages', items: aboutMe.skills.languages },
        { name: 'Frontend', items: aboutMe.skills.frontend },
        { name: 'Backend', items: aboutMe.skills.backend },
        { name: 'Database', items: aboutMe.skills.database },
        { name: 'Tools', items: aboutMe.skills.tools },
    ];

    return (
        <section className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-0" />
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Technical Arsenal
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">{category.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors border border-white/5"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
