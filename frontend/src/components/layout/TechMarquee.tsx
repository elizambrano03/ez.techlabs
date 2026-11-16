import React from 'react';
import { Cpu, Terminal, Database, Code, Globe, Shield, Server, MessageSquare } from 'lucide-react';

export const TechMarquee: React.FC = () => {
  const stackItems = [
    { label: 'PYTHON 3.12', icon: Terminal },
    { label: 'DJANGO 5 + REST API', icon: Code },
    { label: 'REACT 18 + TYPESCRIPT', icon: Globe },
    { label: 'POSTGRESQL & SQL INDEXING', icon: Database },
    { label: 'WHATSAPP COMMERCE API', icon: MessageSquare },
    { label: 'DOCKER ARCHITECTURE', icon: Server },
    { label: 'CORE WEB VITALS 95+', icon: Cpu },
    { label: 'HARDENED SECURITY & RATE LIMITING', icon: Shield },
    { label: 'SOPORTE EN SITIO EN ZULIA', icon: Globe },
  ];

  return (
    <div className="w-full bg-[#090e10] border-y border-ez-border/80 py-3.5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* Double array for seamless loop */}
        {[...stackItems, ...stackItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-2.5 mx-6 text-xs font-mono tracking-widest text-ez-muted/80 uppercase"
            >
              <Icon className="w-3.5 h-3.5 text-ez-neon" />
              <span>{item.label}</span>
              <span className="text-ez-border font-bold ml-4">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

