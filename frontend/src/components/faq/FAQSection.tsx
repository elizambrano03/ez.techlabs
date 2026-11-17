import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import type { FAQItem, SiteConfig } from '../../types';

interface FAQSectionProps {
  faqs: FAQItem[];
  config: SiteConfig;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, config }) => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const whatsappUrl = `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent('Hola EZ Techlabs, tengo una duda antes de cotizar mi proyecto.')}`;

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#090e10] border-t border-ez-border relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ez-panel border border-ez-border text-xs font-mono text-ez-neon uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-ez-neon" />
            <span>CLARIDAD & CONDICIONES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-ez-text tracking-tight mb-4">
            Preguntas <span className="text-ez-neon">frecuentes</span>.
          </h2>
          <p className="text-ez-muted text-sm sm:text-base max-w-xl mx-auto">
            Todo claro desde el primer minuto. Respuestas directas a cómo trabajamos, cómo cobramos y qué esperar.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-ez-panel border-ez-neon/40 shadow-panel'
                    : 'glass-panel border-ez-border hover:border-ez-border/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ez-neon rounded-2xl"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-ez-text pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-black/40 border border-ez-border text-ez-neon transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-ez-neon text-ez-bg' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-ez-muted leading-relaxed border-t border-ez-border/40 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Help Callout */}
        <div className="rounded-xl glass-panel p-6 border border-ez-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-bold text-base text-ez-text">
              ¿Tienes una pregunta específica sobre tu negocio?
            </h4>
            <p className="text-xs sm:text-sm text-ez-muted mt-1">
              Escríbenos directamente a nuestro WhatsApp oficial y te responde un ingeniero.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-ez-neon text-ez-bg text-xs font-mono font-bold tracking-wider uppercase hover:shadow-neon transition-all flex-shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
