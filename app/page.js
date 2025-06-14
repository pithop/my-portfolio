'use client';

import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import Chatbot from '../components/Chatbot';
import ExperienceTimeline from '../components/ExperienceTimeline';
import GitHubStats from '../components/GitHubStats';
import { generateResumePDF } from '../utils/generateResume';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import ContactForm from '../components/ContactForm';
export default function Home() {
  const { t } = useTranslation();

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 120,
              particles: {
                color: { value: "#ffffff" },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.3,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 1.5,
                  direction: "none",
                  outModes: "bounce"
                },
                number: {
                  density: { enable: true, area: 800 },
                  value: 100
                },
                opacity: { value: 0.5 },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
            className="absolute inset-0"
          />
        </div>

        <div className="container-padding text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('welcome')}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('tagline')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={generateResumePDF}
                className="btn-primary"
              >
                {t('downloadResume')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white dark:bg-gray-900">
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutTitle')}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              {t('aboutContent')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-500">3+</div>
                <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-500">20+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-500">5+</div>
                <div className="text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-500">2</div>
                <div className="text-gray-600 dark:text-gray-400">Languages</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('experienceTitle')}
          </motion.h2>
          <ExperienceTimeline />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-white dark:bg-gray-900">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('projectsTitle')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t('projectsData', { returnObjects: true }).map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('skillsTitle')}
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {t('skillsData', { returnObjects: true }).map((skill, index) => (
              <motion.span
                key={index}
                className="skill-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Technical Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Frontend Development</h4>
                <div className="space-y-3">
                  {['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Backend & DevOps</h4>
                <div className="space-y-3">
                  {['Node.js', 'Java', 'Spring Boot', 'Docker', 'Azure', 'SQL'].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section id="github" className="section-padding bg-white dark:bg-gray-900">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('githubStatsTitle')}
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <GitHubStats />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gradient-to-br from-indigo-500 to-indigo-700 text-white relative z-10">
        <div className="container-padding text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('contactTitle')}
          </motion.h2>

          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Have a project or want to collaborate? Get in touch!
          </motion.p>

          <ContactForm />
        </div>
      </section>

      <Chatbot />
    </main>
  );
}