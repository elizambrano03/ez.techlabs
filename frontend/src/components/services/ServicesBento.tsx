import React from 'react';
import { 
  Globe, 
  ShoppingCart, 
  Sparkles, 
  Code, 
  Database, 
  Server, 
  Palette, 
  CheckCircle2, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import type { ServiceItem, SiteConfig } from '../../types';
import { TiltCard } from '../ui/TiltCard';

interface ServicesBentoProps {
  services: ServiceItem[];
  config: SiteConfig;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ services, config }) => {
  const packPro = services.find((s) => s.is_pack_pro) || services.find((s) => s.slug === 'pack-perfil-pro');
  const otherServices = services.filter((s) => !s.is_pack_pro);

  const getWhatsAppServiceUrl = (serviceTitle: string, price?: string) => {
    const text = `Hola EZ Techlabs, me interesa cotizar el servicio: ${serviceTitle}${price ? ` (${price})` : ''}. Vengo desde su página web.`;
    return `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="servicios" className="py-24 bg-ez-bg relative overflow-hidden">
      {/* Structural background lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Editorial Asymmetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ez-border">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-ez-neon uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-ez-neon"></span>
              <span>SERVICIOS & ARQUITECTURA DIGITAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-ez-text tracking-tight">
              Ingeniería a medida pensada para <span className="text-ez-neon">vender</span>.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-ez-muted max-w-sm">
            [SYS-CATALOG: 07 SOLUCIONES ACTIVAS]
            <br />
            Construcción sin plantillas genéricas. Despliegue rápido y código limpio.
          </p>
        </div>

        {/* Bento Grid Layout - Asymmetric Spans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

          {/* SPOTLIGHT: PACK PERFIL PRO ($15) — Spans 7 columns on Desktop for Maximum Dominance */}
          {packPro && (
            <TiltCard 
              id="pack-pro"
              className="lg:col-span-7 rounded-2xl glass-panel-glow p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group"
            >
              {/* Neon Accent Glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-ez-neon/15 blur-3xl rounded-full pointer-events-none"></div>

              <div>
                {/* Header of Pack Pro Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-ez-neon text-ez-bg flex items-center justify-center font-bold shadow-neon">
                      <Sparkles className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-ez-neon/20 text-ez-neon border border-ez-neon/40 tracking-wider">
                        {packPro.badge_text || 'PROMO ACTIVA: 15$'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-ez-text mt-1">
                        {packPro.title}
                      </h3>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="text-right">
                    <span className="text-xs font-mono text-ez-muted block">INVERSIÓN ÚNICA</span>
                    <span className="text-4xl font-display font-black text-ez-neon">
                      {packPro.price_display}
                    </span>
                  </div>
                </div>

                <p className="text-ez-muted text-sm sm:text-base leading-relaxed mb-6">
                  {packPro.short_description}
                </p>

                {/* 5 Specific Deliverables Listed Explicitly as Required */}
                <div className="bg-[#0e1619] border border-ez-border/90 rounded-xl p-5 mb-6">
                  <h4 className="text-xs font-mono text-ez-text uppercase tracking-wider mb-4 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-ez-neon rounded-full"></span>
                    <span>LOS 5 ENTREGABLES INCLUIDOS EN EL PACK:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ez-text/90">
                    <li className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-ez-neon flex-shrink-0 mt-0.5" />
                      <span><strong>1. Ajuste del perfil</strong> y biografía con gancho de ventas</span>
                    </li>
                    <li className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-ez-neon flex-shrink-0 mt-0.5" />
                      <span><strong>2. 5 portadas</strong> de historias destacadas en HD</span>
                    </li>
                    <li className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-ez-neon flex-shrink-0 mt-0.5" />
                      <span><strong>3. 1 enlace directo</strong> personalizado a WhatsApp</span>
                    </li>
                    <li className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-ez-neon flex-shrink-0 mt-0.5" />
                      <span><strong>4. 1 diseño promocional</strong> listo para publicar</span>
                    </li>
                    <li className="flex items-start space-x-2.5 sm:col-span-2">
                      <CheckCircle2 className="w-4 h-4 text-ez-neon flex-shrink-0 mt-0.5" />
                      <span><strong>5. Asesoría técnica y de imagen</strong> personalizada para tu negocio</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-ez-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-ez-muted">
                  ⚡ Entrega en 48 horas hábiles • Garantía EZ Techlabs
                </span>
                <a
                  href={getWhatsAppServiceUrl(packPro.title, packPro.price_display)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-ez-neon text-ez-bg font-display font-bold text-xs uppercase tracking-wider hover:bg-ez-neon/90 shadow-neon transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pedir Pack Pro por 15$</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </TiltCard>
          )}

          {/* SERVICE 2: CATÁLOGOS DIGITALES CON WHATSAPP — Spans 5 columns */}
          {otherServices[1] && (
            <div className="lg:col-span-5 rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-ez-neon bg-ez-neon/10 px-2.5 py-0.5 rounded border border-ez-neon/20">
                    {otherServices[1].badge_text || 'ALTA CONVERSIÓN'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-ez-text mb-2">
                  {otherServices[1].title}
                </h3>
                <p className="text-sm text-ez-muted mb-4 leading-relaxed">
                  {otherServices[1].short_description}
                </p>

                <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                  {otherServices[1].features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-ez-muted">{otherServices[1].price_display}</span>
                <a
                  href={getWhatsAppServiceUrl(otherServices[1].title, otherServices[1].price_display)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1"
                >
                  <span>Cotizar catálogo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* SERVICE 1: PÁGINAS WEB & LANDINGS — Spans 4 columns */}
          {otherServices[0] && (
            <div className="lg:col-span-4 rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-ez-muted">
                    {otherServices[0].badge_text || 'WEB'}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-ez-text mb-2">
                  {otherServices[0].title}
                </h3>
                <p className="text-sm text-ez-muted mb-4">
                  {otherServices[0].short_description}
                </p>

                <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                  {otherServices[0].features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-ez-muted">{otherServices[0].price_display}</span>
                <a
                  href={getWhatsAppServiceUrl(otherServices[0].title, otherServices[0].price_display)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1"
                >
                  <span>Cotizar web</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* SERVICE 3: PYTHON & SOFTWARE A MEDIDA — Spans 4 columns */}
          {otherServices[2] && (
            <div className="lg:col-span-4 rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-ez-muted">
                    {otherServices[2].badge_text || 'PYTHON'}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-ez-text mb-2">
                  {otherServices[2].title}
                </h3>
                <p className="text-sm text-ez-muted mb-4">
                  {otherServices[2].short_description}
                </p>

                <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                  {otherServices[2].features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-ez-muted">{otherServices[2].price_display}</span>
                <a
                  href={getWhatsAppServiceUrl(otherServices[2].title, otherServices[2].price_display)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1"
                >
                  <span>Consultar software</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* SERVICE 4: BASES DE DATOS & AUTOMATIZACIÓN — Spans 4 columns */}
          {otherServices[3] && (
            <div className="lg:col-span-4 rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-ez-muted">
                    {otherServices[3].badge_text || 'DATA'}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-ez-text mb-2">
                  {otherServices[3].title}
                </h3>
                <p className="text-sm text-ez-muted mb-4">
                  {otherServices[3].short_description}
                </p>

                <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                  {otherServices[3].features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-ez-muted">{otherServices[3].price_display}</span>
                <a
                  href={getWhatsAppServiceUrl(otherServices[3].title, otherServices[3].price_display)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1"
                >
                  <span>Automatizar flujo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* SERVICE 5: SOPORTE, REDES Y SERVIDORES (ZULIA) — Spans 6 columns */}
          {otherServices[4] && (
            <div className="lg:col-span-6 rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <Server className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-ez-neon bg-ez-neon/10 px-2.5 py-0.5 rounded border border-ez-neon/20">
                    PRESENCIAL EN ZULIA
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-ez-text mb-2">
                  {otherServices[4].title}
                </h3>
                <p className="text-sm text-ez-muted mb-4">
                  {otherServices[4].short_description}
                </p>

                <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                  {otherServices[4].features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-ez-muted">{otherServices[4].price_display}</span>
                <a
                  href={getWhatsAppServiceUrl(otherServices[4].title, otherServices[4].price_display)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1"
                >
                  <span>Solicitar soporte</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* SERVICE 6: MARKETING & DISEÑO DE MARCA — Spans 6 columns */}
          {otherServices[5] && (
            <div className="lg:col-span-6 rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <Palette className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-ez-muted">
                    {otherServices[5].badge_text || 'BRANDING'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-ez-text mb-2">
                  {otherServices[5].title}
                </h3>
                <p className="text-sm text-ez-muted mb-4">
                  {otherServices[5].short_description}
                </p>

                <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                  {otherServices[5].features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
                <span className="text-xs font-mono text-ez-muted">{otherServices[5].price_display}</span>
                <a
                  href={getWhatsAppServiceUrl(otherServices[5].title, otherServices[5].price_display)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1"
                >
                  <span>Cotizar diseño</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
