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
import Terminal from '../components/Terminal';
export default function Home() {
  const { t } = useTranslation();

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col">

      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-light dark:bg-dark">
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "repulse" },
                  resize: true,
                },
                modes: {
                  repulse: { distance: 100, duration: 0.4 },
                },
              },
              particles: {
                color: { value: "#6366f1" }, // Use a color visible on both backgrounds
                links: { color: "#818cf8", distance: 150, enable: true, opacity: 0.2, width: 1 },
                move: { enable: true, speed: 1, direction: "none", random: true, straight: false, outModes: { default: "out" } },
                number: { density: { enable: true, area: 800 }, value: 80 },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>

        <div className="container-padding w-full z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text and CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* FIXED: Added dark text for light mode, light text for dark mode */}
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 text-slate-800 dark:text-white">
                {t('welcome')}
              </h1>
              {/* FIXED: Added dark text for light mode, light text for dark mode */}
              <p className="text-xl lg:text-2xl text-slate-600 dark:text-indigo-200 mb-8">
                {t('tagline')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={generateResumePDF} className="btn-primary">
                  {t('downloadResume')}
                </button>
                <button onClick={scrollToContact} className="btn-secondary">
                  Contactez-moi
                </button>
              </div>
            </motion.div>
            
            {/* Right Column: Interactive Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Terminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white dark:bg-gray-900">
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aboutcontentTitle')}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              {t('aboutContent')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-indigo-500">1+</div>
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
                <div className="text-3xl font-bold text-indigo-500">3</div>
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
      <section id="private-projects" className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('enterpriseProjectsTitle')}
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-glass p-6 rounded-lg">
              <p className="text-lg mb-4">
                {t('enterpriseProjectsContent')}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                {t('enterpriseProjectsList', { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 italic">
                {t('enterpriseProjectsNote')}
              </p>
            </div>
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