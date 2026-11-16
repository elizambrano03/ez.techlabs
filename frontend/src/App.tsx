import React, { useState, useEffect } from 'react';
import { api, fallbackConfig, fallbackServices, fallbackPortfolio, fallbackFAQs } from './services/api';
import type { SiteConfig, ServiceItem, PortfolioItem, FAQItem } from './types';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { TechMarquee } from './components/layout/TechMarquee';
import { ServicesBento } from './components/services/ServicesBento';
import { ProcessTimeline } from './components/process/ProcessTimeline';
import { PortfolioSection } from './components/portfolio/PortfolioSection';
import { FAQSection } from './components/faq/FAQSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { CustomCursor } from './components/ui/CustomCursor';

export const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(fallbackConfig);
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(fallbackPortfolio);
  const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFAQs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, servicesRes, portfolioRes, faqsRes] = await Promise.all([
          api.getConfig(),
          api.getServices(),
          api.getPortfolio(),
          api.getFAQs(),
        ]);
        setConfig(configRes);
        setServices(servicesRes);
        setPortfolio(portfolioRes);
        setFaqs(faqsRes);
      } catch (err) {
        console.warn("Using offline fallback data for EZ Techlabs", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-ez-bg text-ez-text flex flex-col font-sans selection:bg-ez-neon selection:text-ez-bg">
      {/* Custom Reactive Cursor (Desktop only) */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar config={config} />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section with Interactive Terminal */}
        <Hero config={config} />

        {/* Technical Stack Marquee */}
        <TechMarquee />

        {/* Services Bento Grid (Includes Pack Perfil Pro $15 Spotlight) */}
        <ServicesBento services={services} config={config} />

        {/* Process in 3 Steps + 50/50 Commitment + Zulia Coverage */}
        <ProcessTimeline config={config} />

        {/* Portfolio & Case Studies */}
        <PortfolioSection projects={portfolio} />

        {/* FAQs Section */}
        <FAQSection faqs={faqs} config={config} />

        {/* Direct Contact & Lead Capture Form */}
        <ContactSection config={config} />
      </main>

      {/* Editorial Footer */}
      <Footer config={config} />

      {/* Floating Action WhatsApp with Radar Indicator */}
      <FloatingWhatsApp config={config} />
    </div>
  );
};

export default App;
