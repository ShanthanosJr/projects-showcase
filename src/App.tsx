import { useState } from 'react';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { ProjectCarousel } from './components/ProjectCarousel';
import { ProjectDetail } from './components/ProjectDetail';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { projects, type Project } from './data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { OrbitalBackground } from './components/OrbitalBackground';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-purple-500/30">
      <CommandPalette onSelectProject={setSelectedProject} />

      <Hero />



      <TechStack />

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 max-w-full mx-auto overflow-hidden relative"
        id="projects"
      >
        <OrbitalBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            A selection of my academic and personal projects, demonstrating full-stack capabilities and design thinking.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground font-mono">
            <span>Details hidden in plain sight</span>
            <div className="flex items-center gap-1.5 ml-1">
              <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                <span className="text-[10px]">⌘</span>K
              </span>
              <span className="opacity-50">/</span>
              <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                <span className="text-[10px]">^</span>K
              </span>
            </div>
          </div>
        </motion.div>

        <ProjectCarousel projects={projects} onProjectClick={setSelectedProject} />
      </motion.section>

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
