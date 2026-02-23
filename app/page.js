'use client';

import { useTranslation } from 'react-i18next';
import projectsData from '../data/projects.json';
import ProjectCard from '../components/ProjectCard';
import Chatbot from '../components/Chatbot';
import ExperienceTimeline from '../components/ExperienceTimeline';
import GitHubStats from '../components/GitHubStats';
import { generateResumePDF } from '../utils/generateResume';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText';
import ContactForm from '../components/ContactForm';
import Terminal from '../components/Terminal';
export default function Home() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col">

      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-light dark:bg-dark py-20">
        {/* Modern CSS Background Mesh/Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten opacity-70 animate-blob"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply dark:mix-blend-lighten opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[130px] mix-blend-multiply dark:mix-blend-lighten opacity-60 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10"></div>
        </div>

        <div className="container-padding w-full z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text and CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Alternance Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium text-sm mb-8 border border-green-200 dark:border-green-800/50 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Recherche Alternance Dév (Sept. 2026)
              </div>

              <h1 className="mb-8 relative z-10">
                <span className="block text-xl md:text-2xl font-semibold text-primary mb-4 font-sans tracking-widest uppercase">
                  Introduction
                </span>
                <KineticText
                  text="Idriss Chahraoui"
                  className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-none mb-2"
                  delay={0}
                />
                <KineticText
                  text="Software Engineer."
                  className="text-4xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-400 dark:to-slate-600"
                  delay={5}
                />
              </h1>

              <motion.p
                className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-xl leading-relaxed mix-blend-normal font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                {t('tagline') || "Crafting elegant, high-performance web experiences. bridging the gap between design and robust engineering."}
              </motion.p>

              <div className="flex flex-wrap gap-4 items-center">
                <button onClick={generateResumePDF} className="btn-primary">
                  {t('downloadResume')}
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
                <button onClick={scrollToContact} className="btn-secondary">
                  Contactez-moi
                </button>
              </div>
            </motion.div>

            {/* Right Column: Interactive Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-lg lg:max-w-full"
            >
              {/* Decorative elements behind terminal */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <Terminal />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-transparent border-t border-white/5">
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('aboutcontentTitle')}</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-16 font-light leading-relaxed">
              {t('aboutContent')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {[
                { label: 'Years Experience', value: '1+' },
                { label: 'Projects', value: '20+' },
                { label: 'Technologies', value: '5+' },
                { label: 'Languages', value: '3' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center group hover:bg-white/10 transition-colors">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform origin-center">{stat.value}</div>
                  <div className="text-sm uppercase tracking-widest text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-transparent border-t border-white/5">
        <div className="container-padding max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
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
      <section id="projects" className="section-padding bg-transparent border-t border-white/5">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('projectsTitle')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-transparent border-t border-white/5">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('skillsTitle')}
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {['TypeScript', 'Next.js (App Router)', 'Node.js', 'Python', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'Docker', 'CI/CD (GitHub Actions)', 'Supabase', 'Tailwind CSS', 'Playwright', 'Jest', 'Framer Motion', 'Linux', 'Git', 'Agile/Scrum'].map((skill, index) => (
              <motion.span
                key={index}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-full font-medium transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="mt-24 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-10 text-center tracking-tight">Technical Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
                <h4 className="text-xl font-medium text-white mb-6 uppercase tracking-wider text-sm">Frontend Engineering</h4>
                <div className="space-y-4">
                  {['React & Next.js Ecosystem', 'TypeScript & State Management', 'Modern CSS & Framer Motion', 'Web Accessibility (a11y)'].map((skill, i) => (
                    <div key={i} className="flex items-center group">
                      <div className="w-2 h-2 rounded-full bg-primary mr-4 group-hover:scale-150 transition-transform"></div>
                      <span className="text-slate-300 group-hover:text-white transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
                <h4 className="text-xl font-medium text-white mb-6 uppercase tracking-wider text-sm">Backend & DevOps</h4>
                <div className="space-y-4">
                  {['Node.js, Python & Java', 'RESTful & Serverless APIs', 'Docker & CI/CD Pipelines', 'PostgreSQL & Supabase'].map((skill, i) => (
                    <div key={i} className="flex items-center group">
                      <div className="w-2 h-2 rounded-full bg-accent mr-4 group-hover:scale-150 transition-transform"></div>
                      <span className="text-slate-300 group-hover:text-white transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section id="github" className="section-padding bg-transparent border-t border-white/5">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('githubStatsTitle')}
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <GitHubStats />
          </div>
        </div>
      </section>
      <section id="private-projects" className="section-padding bg-transparent border-t border-white/5">
        <div className="container-padding">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('enterpriseProjectsTitle')}
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-10 md:p-14 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <p className="text-xl md:text-2xl text-slate-300 font-light mb-8 leading-relaxed relative z-10">
                {t('enterpriseProjectsContent')}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
                {t('enterpriseProjectsList', { returnObjects: true }).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-primary mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl relative z-10">
                <p className="italic text-primary-200">
                  {t('enterpriseProjectsNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-black relative border-t border-white/5 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none blur-3xl"></div>

        <div className="container-padding text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('contactTitle')}
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl font-light text-slate-400 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Have a project or want to collaborate? Let&apos;s build something incredible together.
          </motion.p>

          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <ContactForm />
          </div>
        </div>
      </section>

      <Chatbot />
    </main>
  );
}