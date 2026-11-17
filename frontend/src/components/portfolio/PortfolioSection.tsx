import React, { useState } from 'react';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';
import type { PortfolioItem } from '../../types';
import { TiltCard } from '../ui/TiltCard';

interface PortfolioSectionProps {
  projects: PortfolioItem[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filterOptions = [
    { label: 'Todos los Proyectos', value: 'ALL' },
    { label: 'Catálogos WhatsApp', value: 'CATALOG' },
    { label: 'Páginas Web', value: 'WEB' },
    { label: 'Software & Python', value: 'SOFTWARE' },
    { label: 'Pack Pro / Branding', value: 'BRANDING' },
  ];

  const filteredProjects = selectedFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="portafolio" className="py-16 sm:py-24 bg-ez-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-ez-border">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-ez-neon uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-ez-neon"></span>
              <span>CASOS DE ESTUDIO & DEMOSTRACIONES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-ez-text tracking-tight">
              Portafolio de <span className="text-ez-neon">proyectos</span>.
            </h2>
          </div>

          {/* Demo Replacement Notice for the User */}
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-lg max-w-md">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Nota para el administrador:</strong> Estos proyectos de muestra se reemplazan fácilmente desde el panel de control.
            </span>
          </div>
        </div>

        {/* Filter Categories Pill Bar - Mobile horizontal swipe */}
        <div className="flex items-center gap-2 mb-8 sm:mb-12 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap flex-nowrap">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedFilter(opt.value)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all flex-shrink-0 ${
                selectedFilter === opt.value
                  ? 'bg-ez-neon text-ez-bg font-bold shadow-neon'
                  : 'glass-panel text-ez-muted hover:text-ez-text hover:border-ez-neon/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              maxTilt={5}
              className="rounded-2xl glass-panel overflow-hidden border border-ez-border hover:border-ez-neon/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Project Image & Overlay */}
                <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden bg-[#0d1417]">
                  <img
                    src={project.image_display}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1214] via-[#0C1214]/40 to-transparent"></div>

                  {/* Demo vs Real Indicator Badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.is_demo_data ? (
                      <span className="px-2.5 py-1 rounded bg-amber-400 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow">
                        DATO DE EJEMPLO (REEMPLAZABLE)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-ez-neon text-ez-bg font-mono text-[10px] font-black uppercase tracking-wider shadow">
                        PROYECTO REAL
                      </span>
                    )}

                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-ez-text font-mono text-[10px] tracking-wider border border-white/10 uppercase">
                      {project.category_display}
                    </span>
                  </div>

                  {/* Highlight Metric Badge */}
                  {project.metrics_highlight && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-ez-panel/90 backdrop-blur-md border border-ez-neon/40 text-ez-neon font-mono text-xs font-bold">
                      {project.metrics_highlight}
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7">
                  <div className="text-xs font-mono text-ez-muted mb-1">
                    CLIENTE: {project.client_name}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-ez-text mb-3 group-hover:text-ez-neon transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ez-muted leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-ez-panel text-ez-text/80 font-mono text-[11px] border border-ez-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-7 pt-0 border-t border-ez-border/40 flex items-center justify-between">
                <span className="text-xs font-mono text-ez-muted">
                  EZ Techlabs Engineering
                </span>

                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-ez-neon font-bold hover:underline"
                  >
                    <span>Ver Demostración</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-ez-muted">Demo privada</span>
                )}
              </div>

            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
