import { useState } from 'react';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { Footer } from './components/Footer';
import { projects, type Project } from './data/projects';
import { motion } from 'framer-motion';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-purple-500/30">
      <Hero />

      <TechStack />

      <section className="py-24 px-6 max-w-7xl mx-auto" id="projects">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my academic and personal projects, demonstrating full-stack capabilities and design thinking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </section>

      <Footer />

      <ProjectDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}

export default App;
