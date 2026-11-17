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
  MessageSquare,
  Clock,
  Zap
} from 'lucide-react';
import type { ServiceItem, SiteConfig } from '../../types';
import { TiltCard } from '../ui/TiltCard';

interface ServicesBentoProps {
  services: ServiceItem[];
  config: SiteConfig;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ services, config }) => {
  // Find services by slug or fallback
  const webService = services.find((s) => s.slug === 'paginas-web-y-landing-pages') || services[0];
  const catalogService = services.find((s) => s.slug === 'catalogos-digitales-whatsapp') || services[1];
  const softwareService = services.find((s) => s.slug === 'software-a-medida-python') || services[3];
  const dataService = services.find((s) => s.slug === 'bases-de-datos-automatizacion') || services[4];
  const serverService = services.find((s) => s.slug === 'soporte-tecnico-redes-servidores') || services[5];
  const brandingService = services.find((s) => s.slug === 'marketing-diseno-de-marca') || services[6];
  const packProService = services.find((s) => s.is_pack_pro || s.slug === 'pack-perfil-pro') || services[2];

  const getWhatsAppServiceUrl = (serviceTitle: string) => {
    const text = `Hola EZ Techlabs, me interesa cotizar el servicio: ${serviceTitle}. Vengo desde su página web.`;
    return `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(text)}`;
  };

  // Flagship deliverables for the Web & Landing Page engineering spotlight
  const webDeliverables = [
    { title: "Diseño 100% exclusivo a medida", desc: "Arquitectura en React y Tailwind CSS, cero plantillas genéricas ni páginas lentas." },
    { title: "Carga ultra rápida (< 1 segundo)", desc: "Optimización de Core Web Vitals (Puntuación 95+) para retener clientes." },
    { title: "Flujo de conversión a WhatsApp", desc: "Botones inteligentes y checkout directo a tu chat con mensaje estructurado." },
    { title: "SEO local y metadatos sociales", desc: "Indexación para Google y Open Graph optimizado para compartir en redes." },
    { title: "Dominio, Hosting y SSL incluidos", desc: "Despliegue en servidores seguros de alta disponibilidad con monitoreo continuo." }
  ];

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-ez-bg relative overflow-hidden">
      {/* Structural background lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-ez-border">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-ez-neon uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-ez-neon"></span>
              <span>SERVICIOS & ARQUITECTURA DIGITAL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-ez-text tracking-tight">
              Ingeniería a medida pensada para <span className="text-ez-neon">vender</span>.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-ez-muted max-w-sm">
            [SYS-CATALOG: SOLUCIONES DIGITALES ACTIVAS]
            <br />
            Construcción sin plantillas genéricas. Despliegue rápido y código limpio.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">

          {/* SPOTLIGHT HERO: PÁGINAS WEB & LANDINGS DE ALTA CONVERSIÓN (7 cols Desktop) */}
          <TiltCard 
            id="servicios-destacado"
            className="lg:col-span-7 rounded-2xl glass-panel-glow p-5 sm:p-8 relative overflow-hidden flex flex-col justify-between group border border-ez-neon/40 shadow-neon"
          >
            {/* Neon Accent Glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-ez-neon/15 blur-3xl rounded-full pointer-events-none"></div>

            <div>
              {/* Header of Spotlight Card */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-ez-neon text-ez-bg flex items-center justify-center font-bold shadow-neon flex-shrink-0">
                    <Globe className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-ez-neon/20 text-ez-neon border border-ez-neon/40 tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>SOLUCIÓN DESTACADA • ALTA CONVERSIÓN</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-ez-text mt-1.5">
                      {webService?.title || 'Páginas Web & Landing Pages de Alto Rendimiento'}
                    </h3>
                  </div>
                </div>

                {/* Modality Tag */}
                <div className="text-left sm:text-right mt-1 sm:mt-0">
                  <span className="text-[11px] font-mono text-ez-muted block">MODALIDAD</span>
                  <span className="text-sm sm:text-base font-display font-bold text-ez-neon">
                    Cotización a Medida
                  </span>
                </div>
              </div>

              <p className="text-ez-muted text-sm sm:text-base leading-relaxed mb-6">
                Sitios web rápidos, responsivos y con arquitectura orientada a convertir visitas en clientes potenciales. Diseñamos con estética técnica de vanguardia para posicionar tu marca con autoridad inmediata.
              </p>

              {/* 5 Deliverables Included in Web Solution */}
              <div className="bg-[#0e1619] border border-ez-border/90 rounded-xl p-4 sm:p-5 mb-6">
                <h4 className="text-xs font-mono text-ez-text uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-ez-neon rounded-full"></span>
                  <span>5 ENTREGABLES CLAVE DE INGENIERÍA:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ez-text/90">
                  {webDeliverables.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start space-x-2.5 ${idx === 4 ? 'sm:col-span-2' : ''}`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-ez-neon flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ez-text">{item.title}:</strong>{' '}
                        <span className="text-ez-muted text-xs">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-ez-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-ez-muted">
                <Clock className="w-4 h-4 text-ez-neon flex-shrink-0" />
                <span>Entrega desde 5 días hábiles • Garantía 50/50</span>
              </div>
              <a
                href={getWhatsAppServiceUrl("Páginas Web y Landing Pages")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-ez-neon text-ez-bg font-display font-bold text-xs uppercase tracking-wider hover:bg-ez-neon/90 shadow-neon transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Cotizar Proyecto</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </TiltCard>

          {/* SERVICE 2: CATÁLOGOS DIGITALES CON WHATSAPP (5 cols Desktop) */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-5 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-ez-neon bg-ez-neon/10 px-2.5 py-0.5 rounded border border-ez-neon/20">
                  ALTA CONVERSIÓN
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-ez-text mb-2">
                {catalogService?.title || 'Catálogos Digitales con Pedido por WhatsApp'}
              </h3>
              <p className="text-xs sm:text-sm text-ez-muted mb-4 leading-relaxed">
                Permite que tus clientes elijan productos en una interfaz moderna y te envíen la orden detallada con cálculo de totales directamente a tu chat de WhatsApp.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ez-neon flex-shrink-0 mt-0.5" />
                  <span>Panel autogestionable para actualizar fotos y precios</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ez-neon flex-shrink-0 mt-0.5" />
                  <span>Generador de mensajes de orden listos para WhatsApp</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ez-neon flex-shrink-0 mt-0.5" />
                  <span>Multimoneda: Bolívares (BCV), Dólares y Cripto/USDT</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
              <span className="text-xs font-mono text-ez-muted">Presupuesto a medida</span>
              <a
                href={getWhatsAppServiceUrl(catalogService?.title || "Catálogo Digital WhatsApp")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1 font-bold"
              >
                <span>Cotizar catálogo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* SERVICE 3: PYTHON & SOFTWARE A MEDIDA (4 cols Desktop) */}
          <div className="lg:col-span-4 rounded-2xl glass-panel p-5 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                  <Code className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-ez-muted">INGENIERÍA</span>
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold text-ez-text mb-2">
                {softwareService?.title || 'Python & Software a Medida'}
              </h3>
              <p className="text-xs sm:text-sm text-ez-muted mb-4 leading-relaxed">
                Sistemas web internos, módulos administrativos y lógica personalizada desarrollada con Python 3.12 y Django para optimizar tus operaciones.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Paneles con roles y permisos de acceso</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Módulos de facturación, inventario y reportes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>APIs REST seguras y de alto rendimiento</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
              <span className="text-xs font-mono text-ez-muted">Desarrollo a medida</span>
              <a
                href={getWhatsAppServiceUrl(softwareService?.title || "Software a Medida")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1 font-bold"
              >
                <span>Consultar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* SERVICE 4: BASES DE DATOS & AUTOMATIZACIÓN (4 cols Desktop) */}
          <div className="lg:col-span-4 rounded-2xl glass-panel p-5 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-ez-muted">DATA & SQL</span>
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold text-ez-text mb-2">
                {dataService?.title || 'Bases de Datos & Automatización'}
              </h3>
              <p className="text-xs sm:text-sm text-ez-muted mb-4 leading-relaxed">
                Conexión entre aplicaciones, optimización de consultas en PostgreSQL y eliminación de tareas manuales repetitivas mediante scripts automatizados.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Sincronización de datos e inventarios</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Ejecución de tareas periódicas y cron jobs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Diseño e indexación SQL de alta velocidad</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
              <span className="text-xs font-mono text-ez-muted">Flujos automatizados</span>
              <a
                href={getWhatsAppServiceUrl(dataService?.title || "Bases de Datos & Automatización")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1 font-bold"
              >
                <span>Automatizar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* SERVICE 5: SOPORTE TÉCNICO, REDES & SERVIDORES (4 cols Desktop) */}
          <div className="lg:col-span-4 rounded-2xl glass-panel p-5 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                  <Server className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-ez-neon bg-ez-neon/10 px-2.5 py-0.5 rounded border border-ez-neon/20">
                  PRESENCIAL EN ZULIA
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold text-ez-text mb-2">
                {serverService?.title || 'Soporte Técnico, Redes & Servidores'}
              </h3>
              <p className="text-xs sm:text-sm text-ez-muted mb-4 leading-relaxed">
                Mantenimiento de infraestructura, hardening de Linux, Docker, respaldos automáticos y asistencia técnica presencial en Maracaibo y el Zulia.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Asistencia presencial directa en Maracaibo/Zulia</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Servidores Linux, Docker y copias de seguridad</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Monitoreo 24/7 y respuesta ante incidencias</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
              <span className="text-xs font-mono text-ez-muted">Asistencia técnica 24/7</span>
              <a
                href={getWhatsAppServiceUrl(serverService?.title || "Soporte Técnico y Servidores")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1 font-bold"
              >
                <span>Solicitar soporte</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* SERVICE 6: MARKETING & DISEÑO DE MARCA (6 cols Desktop) */}
          <div className="lg:col-span-6 rounded-2xl glass-panel p-5 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-ez-muted">IDENTIDAD VISUAL</span>
              </div>

              <h3 className="text-xl font-display font-bold text-ez-text mb-2">
                {brandingService?.title || 'Marketing & Diseño de Marca'}
              </h3>
              <p className="text-xs sm:text-sm text-ez-muted mb-4 leading-relaxed">
                Dale a tu negocio una imagen que transmita confianza inmediata. Diseñamos logotipos vectoriales, manuales de marca y piezas gráficas para destacar en el mercado.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Diseño y vectorización de logotipos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Kits de marca y paletas de color con alto contraste</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ez-neon"></span>
                  <span>Material para redes sociales y piezas publicitarias</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
              <span className="text-xs font-mono text-ez-muted">Diseño personalizado</span>
              <a
                href={getWhatsAppServiceUrl(brandingService?.title || "Diseño de Marca y Marketing")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1 font-bold"
              >
                <span>Cotizar diseño</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* SERVICE 7: PACK PERFIL PRO (6 cols Desktop) */}
          <div className="lg:col-span-6 rounded-2xl glass-panel p-5 sm:p-7 flex flex-col justify-between hover:border-ez-neon/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-ez-neon bg-ez-neon/10 px-2.5 py-0.5 rounded border border-ez-neon/20">
                  REDES & VENTAS
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xl font-display font-bold text-ez-text">
                  {packProService?.title || 'Pack Perfil Pro'}
                </h3>
                <span className="text-xs font-mono text-ez-muted">
                  Optimización Express
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ez-muted mb-4 leading-relaxed">
                Optimización estratégica de tu perfil comercial de Instagram para generar confianza inmediata y convertir seguidores en mensajes de WhatsApp.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-ez-text/80">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ez-neon flex-shrink-0" />
                  <span>Ajuste estratégico de biografía y gancho de ventas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ez-neon flex-shrink-0" />
                  <span>5 portadas para historias destacadas en HD</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ez-neon flex-shrink-0" />
                  <span>1 enlace directo a WhatsApp y 1 diseño promocional</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ez-border/60 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-ez-muted">
                <Zap className="w-3.5 h-3.5 text-ez-neon flex-shrink-0" />
                <span>Entrega en 48h hábiles</span>
              </div>
              <a
                href={getWhatsAppServiceUrl("Pack Perfil Pro")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-ez-neon hover:underline flex items-center space-x-1 font-bold"
              >
                <span>Consultar pack</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
