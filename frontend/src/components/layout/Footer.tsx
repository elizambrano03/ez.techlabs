import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import type { SiteConfig } from '../../types';

interface FooterProps {
  config: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070b0c] border-t border-ez-border text-ez-muted text-xs font-mono relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5">
            <a href="#" className="inline-block mb-4">
              <img
                src="/assets/logo/eztechlabs-horizontal-dark.png"
                alt="EZ Techlabs"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-sm font-sans text-ez-muted max-w-sm mb-6 leading-relaxed">
              Estudio de ingeniería de software y desarrollo web radicado en el estado Zulia, Venezuela. Activos digitales de alta velocidad concebidos específicamente para vender y automatizar negocios.
            </p>

            <div className="space-y-1.5 text-xs text-ez-text/70">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-ez-neon" />
                <span>Maracaibo, Zulia [10.6427° N, 71.6125° W]</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-ez-neon" />
                <span>Compromiso de Confianza 50/50 Garantizado</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-ez-text font-bold mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#servicios" className="hover:text-ez-neon transition-colors">
                  Servicios de Software & Web
                </a>
              </li>
              <li>
                <a href="#servicios-destacado" className="hover:text-ez-neon transition-colors text-ez-neon font-bold">
                  Páginas Web & Landing Pages
                </a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-ez-neon transition-colors">
                  Metodología en 3 Pasos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-ez-neon transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-ez-neon transition-colors">
                  Formulario de Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct & Social (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-ez-text font-bold mb-4">
              Canales Oficiales
            </h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${config.whatsapp_raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 text-ez-text hover:text-ez-neon transition-colors group"
              >
                <div className="p-1.5 rounded bg-ez-panel border border-ez-border text-ez-neon group-hover:border-ez-neon">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{config.whatsapp_number}</span>
              </a>

              <a
                href={config.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 text-ez-text hover:text-ez-neon transition-colors group"
              >
                <div className="p-1.5 rounded bg-ez-panel border border-ez-border text-ez-text group-hover:border-ez-neon">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <span>{config.instagram_handle}</span>
              </a>

              <div className="flex items-center space-x-2.5 text-ez-text">
                <div className="p-1.5 rounded bg-ez-panel border border-ez-border text-ez-neon">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{config.contact_email}</span>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-ez-panel/60 border border-ez-border">
              <span className="text-[11px] text-ez-neon font-bold block mb-1">
                DISPONIBILIDAD TÉCNICA 24/7
              </span>
              <p className="text-[11px] text-ez-muted">
                Monitoreo activo para garantizar el funcionamiento continuo de tus plataformas.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-ez-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} EZ Techlabs (@ez.techlabs). Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Hecho con ingeniería en el Zulia</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-ez-panel border border-ez-border hover:border-ez-neon text-ez-muted hover:text-ez-neon transition-colors"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
