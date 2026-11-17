import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import type { SiteConfig } from '../../types';

interface FloatingWhatsAppProps {
  config: SiteConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ config }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(config.whatsapp_welcome_message)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* Floating Tooltip */}
      {showTooltip && (
        <div className="mb-2 sm:mb-3 p-3 max-w-[250px] sm:max-w-xs rounded-xl glass-panel-glow border border-ez-neon/50 text-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-ez-muted hover:text-ez-text p-1"
            aria-label="Cerrar notificación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center space-x-1.5 text-ez-neon font-mono font-bold text-[10px] sm:text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-ez-neon animate-ping"></span>
            <span>EQUIPO ONLINE EN ZULIA 24/7</span>
          </div>
          <p className="text-ez-text/90 pr-2 text-[11px] sm:text-xs leading-relaxed">
            ¿Quieres cotizar tu página web o desarrollo a medida? Hablemos por WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Button Trigger */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a EZ Techlabs por WhatsApp"
        className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ez-neon text-ez-bg shadow-neon hover:shadow-neon-strong transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-ez-neon/40"
      >
        {/* Pulsing halo wave */}
        <span className="absolute -inset-1 rounded-full bg-ez-neon opacity-40 animate-ping pointer-events-none"></span>

        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10" />
      </a>
    </div>
  );
};
