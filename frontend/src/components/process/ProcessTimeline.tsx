import React from 'react';
import { MessageSquare, Layers, Rocket, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import type { SiteConfig } from '../../types';
import { TiltCard } from '../ui/TiltCard';
import { ScrollReveal3D } from '../ui/ScrollReveal3D';

interface ProcessTimelineProps {
  config: SiteConfig;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ config }) => {
  const steps = [
    {
      number: '01',
      title: 'Nos cuentas de tu negocio',
      subtitle: 'Diagnóstico & Estrategia',
      description: 'Analizamos qué vendes, quiénes son tus clientes y qué canal genera mayor conversión (landing page, catálogo por WhatsApp o sistema a medida). Te entregamos una propuesta clara con tiempos exactos.',
      icon: MessageSquare,
      tag: 'FASE INICIAL',
    },
    {
      number: '02',
      title: 'Diseñamos y programamos',
      subtitle: 'Arquitectura Limpia & Prototipado',
      description: 'Construimos tu plataforma desde cero con código optimizado (Python/React/Tailwind). Arquitectura limpia: garantizamos máxima velocidad de carga, alta seguridad y una experiencia impecable en móviles.',
      icon: Layers,
      tag: 'INGENIERÍA A MEDIDA',
    },
    {
      number: '03',
      title: 'Publicamos y vendes',
      subtitle: 'Despliegue & Validación 100%',
      description: 'Configuramos tu dominio, SSL, optimizaciones y te enseñamos a gestionar tus pedidos y clientes. Tu sistema queda operativo las 24 horas y con monitoreo técnico continuo.',
      icon: Rocket,
      tag: 'LANZAMIENTO EN VIVO',
    },
  ];

  const whatsappUrl = `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent('Hola EZ Techlabs, quiero comenzar el proceso de desarrollo en 3 pasos para mi negocio.')}`;

  return (
    <section id="proceso" className="py-16 sm:py-24 bg-[#090e10] border-y border-ez-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ez-panel border border-ez-border text-xs font-mono text-ez-neon uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
            <span>METODOLOGÍA TRANSPARENTE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-ez-text tracking-tight mb-4">
            Proceso en 3 pasos simples.
          </h2>
          <p className="text-ez-muted text-base">
            Sin rodeos técnicos innecesarios ni demoras interminables. Sabemos que tu prioridad es salir a vender.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal3D 
                key={step.number}
                direction="up"
                delay={idx * 0.15}
                duration={0.7}
                depth={45}
                className="h-full"
              >
                <TiltCard
                  maxTilt={8}
                  glareIntensity={0.12}
                  className="h-full relative rounded-2xl glass-panel p-8 flex flex-col justify-between border border-ez-border hover:border-ez-neon/40 transition-all duration-300 group"
                >
                  {/* Step Number Watermark */}
                  <span className="absolute top-4 right-6 text-5xl font-display font-black text-white/5 select-none group-hover:text-ez-neon/10 transition-colors">
                    {step.number}
                  </span>

                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-ez-neon px-2.5 py-0.5 rounded bg-ez-neon/10 border border-ez-neon/20">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-ez-text mb-1">
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono text-ez-neon block mb-4">
                      {step.subtitle}
                    </span>

                    <p className="text-sm text-ez-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-ez-border/60 flex items-center text-xs font-mono text-ez-text/60">
                    <span>Paso {idx + 1} de 3</span>
                  </div>
                </TiltCard>
              </ScrollReveal3D>
            );
          })}
        </div>

        {/* COMPROMISO 50/50 & COBERTURA REGIONAL CALLOUT */}
        <div className="rounded-2xl glass-panel-glow p-5 sm:p-10 border border-ez-neon/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side: 50/50 Trust Commitment (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-ez-neon text-ez-bg font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-ez-neon tracking-wider uppercase">POLÍTICA DE PAGO TRANSPARENTE</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-ez-text">
                    {config.commitment_title}
                  </h3>
                </div>
              </div>

              <p className="text-ez-muted text-sm sm:text-base leading-relaxed mb-6">
                {config.commitment_description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ez-text/90">
                <div className="flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-lg border border-ez-border">
                  <span className="text-ez-neon font-bold">50%</span>
                  <span>Anticipo al aprobar alcance</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-lg border border-ez-border">
                  <span className="text-ez-neon font-bold">50%</span>
                  <span>Restante contra entrega probada</span>
                </div>
              </div>
            </div>

            {/* Right side: Regional & 24/7 Coverage Badge (5 cols) */}
            <div className="lg:col-span-5 bg-black/50 border border-ez-border rounded-xl p-6">
              <h4 className="text-xs font-mono text-ez-neon uppercase tracking-wider mb-4 flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>COBERTURA & DISPONIBILIDAD TÉCNICA</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-ez-muted mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-ez-neon mt-1.5 flex-shrink-0"></div>
                  <div>
                    <strong className="text-ez-text">Presencial:</strong> Exclusivo en el estado Zulia, Venezuela (reuniones en Maracaibo, San Francisco y zonas comerciales).
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-ez-neon mt-1.5 flex-shrink-0"></div>
                  <div>
                    <strong className="text-ez-text">Remoto:</strong> Atención fluida a nivel nacional e internacional.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-ez-neon mt-1.5 flex-shrink-0"></div>
                  <div>
                    <strong className="text-ez-text">Operación 24/7:</strong> Monitoreo de servidores y respuesta a emergencias técnicas los 365 días del año.
                  </div>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-ez-neon text-ez-bg font-display font-bold text-xs uppercase tracking-wider hover:bg-ez-neon/90 shadow-neon transition-all"
              >
                <span>Conversar con un Ingeniero</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
