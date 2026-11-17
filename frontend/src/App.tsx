import React, { useState, useEffect } from 'react';
import { api, fallbackConfig, fallbackServices, fallbackFAQs } from './services/api';
import type { SiteConfig, ServiceItem, FAQItem } from './types';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { TechMarquee } from './components/layout/TechMarquee';
import { ServicesBento } from './components/services/ServicesBento';
import { ProcessTimeline } from './components/process/ProcessTimeline';
import { FAQSection } from './components/faq/FAQSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollReveal3D } from './components/ui/ScrollReveal3D';
import { CyberScanline, CyberNoise } from './components/ui/CyberEffects';

export const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(fallbackConfig);
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFAQs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, servicesRes, faqsRes] = await Promise.all([
          api.getConfig(),
          api.getServices(),
          api.getFAQs(),
        ]);
        setConfig(configRes);
        setServices(servicesRes);
        setFaqs(faqsRes);
      } catch (err) {
        console.warn("Using offline fallback data for EZ Techlabs", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-ez-bg text-ez-text flex flex-col font-sans selection:bg-ez-neon selection:text-ez-bg">
      {/* ── Efectos globales de ambiente ── */}
      <CyberNoise />
      <CyberScanline />

      {/* Custom Reactive Cursor (Desktop only) */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar config={config} />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero — sin ScrollReveal (ya tiene animaciones propias) */}
        <Hero config={config} />

        {/* Technical Stack Marquee */}
        <ScrollReveal3D direction="up" delay={0} duration={0.6}>
          <TechMarquee />
        </ScrollReveal3D>

        {/* Services Bento Grid */}
        <ScrollReveal3D direction="up" delay={0.05} duration={0.8} depth={60}>
          <ServicesBento services={services} config={config} />
        </ScrollReveal3D>

        {/* Process in 3 Steps */}
        <ScrollReveal3D direction="left" delay={0.05} duration={0.75} depth={50}>
          <ProcessTimeline config={config} />
        </ScrollReveal3D>

        {/* FAQs Section */}
        <ScrollReveal3D direction="right" delay={0.05} duration={0.75} depth={50}>
          <FAQSection faqs={faqs} config={config} />
        </ScrollReveal3D>

        {/* Contact */}
        <ScrollReveal3D direction="up" delay={0.05} duration={0.8} depth={60}>
          <ContactSection config={config} />
        </ScrollReveal3D>
      </main>

      {/* Editorial Footer */}
      <ScrollReveal3D direction="up" delay={0} duration={0.6}>
        <Footer config={config} />
      </ScrollReveal3D>

      {/* Floating Action WhatsApp */}
      <FloatingWhatsApp config={config} />
    </div>
  );
};

export default App;
