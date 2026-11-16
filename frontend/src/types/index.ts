export interface SiteConfig {
  id: number;
  company_name: string;
  tagline: string;
  hero_headline: string;
  hero_subheadline: string;
  whatsapp_number: string;
  whatsapp_raw: string;
  whatsapp_welcome_message: string;
  instagram_handle: string;
  instagram_url: string;
  contact_email: string;
  coverage_title: string;
  coverage_summary: string;
  commitment_title: string;
  commitment_description: string;
  system_status_text: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  detailed_description: string;
  features: string[];
  price_display: string;
  badge_text: string;
  icon_name: string;
  is_pack_pro: boolean;
  is_featured: boolean;
  order: number;
}

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  category: 'WEB' | 'CATALOG' | 'SOFTWARE' | 'BRANDING';
  category_display: string;
  summary: string;
  description: string;
  technologies: string[];
  metrics_highlight: string;
  live_url: string;
  github_url: string;
  image_display: string;
  is_demo_data: boolean;
  is_featured: boolean;
  order: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface LeadSubmission {
  full_name: string;
  business_name?: string;
  email: string;
  phone: string;
  service_interest: string;
  budget_range?: string;
  message: string;
  honey_trap?: string;
}

