import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProjectCard({ project, index }) {
  // Fallback for missing images
  const getImageUrl = () => {
    return `/project-${(index % 3) + 1}.svg`; // Use 1-3 project images
  };

  return (
    <motion.div
      className="bg-glass rounded-2xl overflow-hidden shadow-lg"
      whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="h-48 relative bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {/* Add a motion.div wrapper for the image */}
        <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <Image 
              src={getImageUrl()}
              alt={project.title}
              fill
              className="object-cover"
            />
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.split(', ').map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-sm rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <button className="text-indigo-500 font-medium hover:text-indigo-700 dark:hover:text-indigo-400 flex items-center">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}