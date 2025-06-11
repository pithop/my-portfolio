'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function ExperienceTimeline() {
  const { t } = useTranslation();
  const experiences = t('experienceData', { returnObjects: true });

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
      
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-12 md:pl-0"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Dot */}
            <div className="absolute left-2 md:left-1/2 top-6 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-gray-900 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
            
            <div className={`bg-glass rounded-2xl p-6 shadow-lg ${index % 2 === 0 ? 'md:mr-auto md:w-[calc(50%-4rem)]' : 'md:ml-auto md:w-[calc(50%-4rem)]'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <h4 className="text-lg text-indigo-500">{exp.company}</h4>
                </div>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                  {exp.date}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {['Web Development', 'Linux', 'Security', 'DevOps'].map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}