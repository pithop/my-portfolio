'use client';

import { useTranslation } from 'react-i18next';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

function ExperienceCard({ exp, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="relative pl-12 md:pl-0 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Dot */}
      <div className="absolute left-4 md:left-1/2 top-8 w-3 h-3 rounded-full bg-primary ring-4 ring-black transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>

      <div
        className={`relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 transition-colors overflow-hidden ${index % 2 === 0 ? 'md:mr-auto md:w-[calc(50%-3rem)]' : 'md:ml-auto md:w-[calc(50%-3rem)]'}`}
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight Hover Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.06),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row justify-between xl:items-start mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{exp.title}</h3>
              <h4 className="text-lg font-medium text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{exp.company}</h4>
            </div>
            <span className="inline-flex px-4 py-1.5 border border-white/10 bg-white/5 text-slate-300 rounded-full text-sm font-medium whitespace-nowrap h-fit">
              {exp.date}
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed font-light">{exp.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Web Development', 'Linux', 'Security', 'DevOps'].map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-transparent border border-white/10 text-slate-400 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const { t } = useTranslation();
  const experiences = t('experienceData', { returnObjects: true });

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent transform -translate-x-1/2"></div>

      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} index={index} />
        ))}
      </div>
    </div>
  );
}