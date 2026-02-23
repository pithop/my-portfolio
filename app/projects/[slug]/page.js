import Link from 'next/link';
import projectsData from '@/data/projects.json';

function getProjectBySlug(slug) {
    const projectIndex = projectsData.findIndex(p => p.slug === slug);

    if (projectIndex !== -1) {
        return projectsData[projectIndex];
    }
    return null;
}
export default async function ProjectPage({ params }) {
    // We need to await params in Next.js 15
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/#projects" className="btn-primary inline-flex">Return to Portfolio</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-20 bg-transparent">
            <div className="container-padding max-w-4xl mx-auto">

                <Link href="/#projects" className="inline-flex items-center text-primary mb-12 hover:text-white transition-colors group tracking-widest uppercase text-sm font-medium">
                    <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{project.title}</h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl font-light">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack Bubbles */}
                <div className="flex flex-wrap gap-3 mb-20">
                    {project.technologies.split(', ').map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-slate-300 rounded-full font-medium tracking-wider uppercase text-xs">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* The Deep Dive Content Wrapper */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-14 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>

                    <div className="mb-16 relative z-10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center text-sm font-black">01</span>
                            The Problem
                        </h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            {project.problem}
                        </p>
                    </div>

                    <div className="mb-16 relative z-10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center text-sm font-black">02</span>
                            Technical Solution
                        </h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            {project.solution}
                        </p>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
                            <span className="w-10 h-10 rounded-xl bg-green-500/20 text-green-500 flex items-center justify-center text-sm font-black">03</span>
                            Business Impact
                        </h2>
                        <ul className="space-y-6">
                            {project.impact.map((point, i) => (
                                <li key={i} className="flex items-start">
                                    <svg className="w-6 h-6 text-green-400 mr-4 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-lg text-slate-300 font-light leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Extracted CTA Action area */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                            View Source Code
                        </a>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-6">Interested in discussing this project?</h3>
                    <Link href="/#contact" className="btn-primary inline-flex">
                        Get in Touch
                    </Link>
                </div>

            </div>
        </main>
    );
}
