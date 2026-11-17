import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Sparkles, MapPin, Clock } from 'lucide-react';
import type { SiteConfig } from '../../types';
import { TerminalSimulator } from './TerminalSimulator';
import { HeroCanvas } from './HeroCanvas';
import { MagneticButton } from '../ui/MagneticButton';

interface HeroProps {
  config: SiteConfig;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const whatsappUrl = `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(config.whatsapp_welcome_message)}`;

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-grid-pattern">
      {/* Interactive Living Particle Network Background */}
      <HeroCanvas />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[350px] bg-ez-neon/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag & Regional Identifier */}
        <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ez-panel border border-ez-border text-[11px] sm:text-xs font-mono text-ez-neon">
            <span className="w-1.5 h-1.5 rounded-full bg-ez-neon animate-pulse"></span>
            <span className="font-bold tracking-wider uppercase">ESTUDIO DE SOFTWARE & DESARROLLO WEB</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-ez-panel/60 border border-ez-border text-[11px] sm:text-xs font-mono text-ez-muted">
            <MapPin className="w-3.5 h-3.5 text-ez-neon flex-shrink-0" />
            <span>PRESENCIAL EN ZULIA • REMOTO GLOBAL</span>
          </div>

          <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-ez-panel/60 border border-ez-border text-xs font-mono text-ez-muted">
            <Clock className="w-3.5 h-3.5 text-ez-neon flex-shrink-0" />
            <span>OPERACIÓN TÉCNICA 24/7</span>
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Bold Typography & Conversion CTAs (7 cols) */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-display font-extrabold tracking-tight leading-[1.12] text-ez-text mb-5 sm:mb-6">
              Páginas web y software que hacen que tu negocio{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ez-neon via-[#c0ff3e] to-[#80c800] underline decoration-ez-neon/40 decoration-4 underline-offset-8">
                venda
              </span>
              .
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-ez-muted leading-relaxed max-w-2xl mb-6 sm:mb-8">
              En <strong className="text-ez-text">EZ Techlabs</strong> fabricamos activos digitales con ingeniería de software limpia: páginas web y landing pages de carga instantánea, catálogos con pedidos directos a WhatsApp, sistemas en Python y automatizaciones a la medida de tu empresa.
            </p>

            {/* Value Indicators Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8 text-xs font-mono">
              <div className="flex items-center space-x-2 text-ez-text/90">
                <ShieldCheck className="w-4 h-4 text-ez-neon flex-shrink-0" />
                <span>Compromiso 50% inicio / 50% al entregar</span>
              </div>
              <div className="flex items-center space-x-2 text-ez-text/90">
                <Zap className="w-4 h-4 text-ez-neon flex-shrink-0" />
                <span>Velocidad extrema: Carga en menos de 1s</span>
              </div>
              <div className="flex items-center space-x-2 text-ez-text/90">
                <Sparkles className="w-4 h-4 text-ez-neon flex-shrink-0" />
                <span>Ingeniería a medida: Desarrollo 100% exclusivo</span>
              </div>
              <div className="flex items-center space-x-2 text-ez-text/90">
                <MapPin className="w-4 h-4 text-ez-neon flex-shrink-0" />
                <span>Atención presencial en todo el estado Zulia</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <MagneticButton href={whatsappUrl} target="_blank" rel="noopener noreferrer" strength={18}>
                <div className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-ez-neon text-ez-bg font-display font-bold text-xs sm:text-sm tracking-wider uppercase shadow-neon hover:shadow-neon-strong transition-all duration-200">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Iniciar Proyecto por WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </MagneticButton>

              <a
                href="#servicios"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 sm:py-4 rounded-xl glass-panel hover:bg-ez-panelHover text-ez-text font-mono text-xs uppercase tracking-wider border border-ez-border hover:border-ez-neon/50 transition-all duration-200"
              >
                <span>Explorar Soluciones</span>
              </a>
            </div>

            {/* Quick Micro-Badge */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-ez-border/60 flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-ez-neon/10 border border-ez-neon/30 text-ez-neon font-mono text-[11px] sm:text-xs font-bold">
                DESARROLLO 100% A MEDIDA
              </span>
              <p className="text-xs text-ez-muted">
                ¿Listo para modernizar tu negocio?{' '}
                <a href="#servicios" className="inline-flex items-center space-x-1 text-ez-neon hover:underline font-semibold ml-1">
                  <span>Ver catálogo de soluciones</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Code Terminal (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative">
              {/* Corner tech accents */}
              <div className="hidden sm:block absolute -top-3 -right-3 text-[10px] font-mono text-ez-neon/60">
                [EZ-SYS: ACTIVE]
              </div>
              <TerminalSimulator />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
