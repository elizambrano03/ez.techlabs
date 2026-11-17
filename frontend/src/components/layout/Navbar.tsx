import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import type { SiteConfig } from '../../types';

interface NavbarProps {
  config: SiteConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Páginas Web', href: '#servicios-destacado', highlight: true },
    { label: 'Proceso & Garantía', href: '#proceso' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Preguntas', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const whatsappUrl = `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(config.whatsapp_welcome_message)}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#0C1214]/90 backdrop-blur-md border-b border-ez-border/80 shadow-panel' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Live Radar */}
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center group" aria-label="EZ Techlabs Inicio">
              <img 
                src="/assets/logo/eztechlabs-horizontal-dark.png" 
                alt="EZ Techlabs" 
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </a>

            {/* Technical System Status Radar */}
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-ez-panel/80 border border-ez-border text-[11px] font-mono tracking-wider text-ez-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ez-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ez-neon"></span>
              </span>
              <span>{config.system_status_text}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 border border-ez-border/60 bg-ez-panel/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-mono transition-all rounded-full ${
                  link.highlight
                    ? 'text-ez-bg bg-ez-neon font-bold shadow-neon hover:bg-ez-neon/90'
                    : 'text-ez-text/80 hover:text-ez-neon hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-ez-neon text-ez-bg text-xs font-mono font-bold tracking-wider uppercase hover:shadow-neon transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Cotizar por WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-ez-panel border border-ez-border text-ez-text hover:text-ez-neon focus:outline-none"
              aria-label={mobileMenuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl bg-[#0e1619]/98 backdrop-blur-xl border border-ez-border shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 pb-3 mb-1 border-b border-ez-border/60 text-[11px] font-mono text-ez-muted">
                <span className="h-2 w-2 rounded-full bg-ez-neon animate-pulse"></span>
                <span>{config.system_status_text}</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-mono tracking-wider transition-colors min-h-[44px] flex items-center ${
                    link.highlight
                      ? 'bg-ez-neon text-ez-bg font-bold shadow-neon'
                      : 'text-ez-text hover:text-ez-neon hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full py-3.5 px-4 rounded-xl bg-ez-neon text-ez-bg text-center text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-neon min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
