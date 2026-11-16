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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Tooltip */}
      {showTooltip && (
        <div className="mb-3 p-3 max-w-xs rounded-xl glass-panel-glow border border-ez-neon/50 text-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-ez-muted hover:text-ez-text"
            aria-label="Cerrar notificación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center space-x-2 text-ez-neon font-mono font-bold text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-ez-neon animate-ping"></span>
            <span>EQUIPO ONLINE EN ZULIA 24/7</span>
          </div>
          <p className="text-ez-text/90 pr-3">
            ¿Quieres cotizar tu página web o el <strong>Pack Perfil Pro ($15)</strong>? Hablemos por WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Button Trigger */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a EZ Techlabs por WhatsApp"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-ez-neon text-ez-bg shadow-neon hover:shadow-neon-strong transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-ez-neon/40"
      >
        {/* Pulsing halo wave */}
        <span className="absolute -inset-1 rounded-full bg-ez-neon opacity-40 animate-ping pointer-events-none"></span>

        <MessageSquare className="w-7 h-7 fill-current relative z-10" />
      </a>
    </div>
  );
};
