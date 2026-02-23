import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({ project, index }) {
  // Spotlight effect state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Fallback for missing images, but prefer the defined image
  const imageUrl = project.image || `/project-${(index % 3) + 1}.svg`;

  return (
    <motion.div
      className="group/card relative bg-glass rounded-2xl overflow-hidden shadow-lg border border-white/5 flex flex-col h-full"
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="h-48 relative bg-white/5 border-b border-white/5 overflow-hidden z-10">
        <div className="relative z-10 w-full h-full overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover opacity-80 mix-blend-screen scale-[1.08] origin-top-left"
            />
          </motion.div>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{project.title}</h3>
        <p className="text-slate-400 leading-relaxed mb-6 font-light flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.split(', ').map((tech, i) => (
            <span key={i} className="px-3 py-1 border border-white/10 bg-white/5 text-slate-300 text-xs tracking-wider uppercase font-medium rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <Link href={`/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center text-primary font-medium hover:text-white transition-colors group/link text-sm uppercase tracking-widest relative z-10">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>

          <div className="flex gap-4 relative z-10">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" title="View Source">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
            )}
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" title="Live Demo">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}