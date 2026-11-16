import type { SiteConfig, ServiceItem, PortfolioItem, FAQItem, LeadSubmission } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://ez-techlabs-backend.onrender.com/api/v1';

export const fallbackConfig: SiteConfig = {
  id: 1,
  company_name: "EZ Techlabs",
  tagline: "Páginas web y software que hacen que tu negocio venda",
  hero_headline: "Páginas web y software que hacen que tu negocio venda",
  hero_subheadline: "Ingeniería de software limpia, diseño editorial de alto impacto y automatizaciones concebidas para transformar visitas en clientes recurrentes. Cobertura remota global y atención presencial en Zulia.",
  whatsapp_number: "+58 414 604 0010",
  whatsapp_raw: "584146040010",
  whatsapp_welcome_message: "¡Hola EZ Techlabs! Vengo de su sitio web y quiero cotizar una solución digital para mi negocio.",
  instagram_handle: "@ez.techlabs",
  instagram_url: "https://instagram.com/ez.techlabs",
  contact_email: "contacto@eztechlabs.com",
  coverage_title: "Cobertura Híbrida & Operación 24/7",
  coverage_summary: "Desarrollamos de forma remota para clientes globales y brindamos atención presencial exclusiva en el estado Zulia, Venezuela. Monitoreo y soporte técnico continuo 24/7.",
  commitment_title: "Compromiso de Confianza 50 / 50",
  commitment_description: "Comenzamos tu proyecto con el 50% de anticipo para arrancar arquitectura y diseño, y el 50% restante solo se cancela cuando el trabajo esté culminado, revisado y listo para desplegar.",
  system_status_text: "OPERACIONAL 24/7 • MARACAIBO, VE"
};

export const fallbackServices: ServiceItem[] = [
  {
    id: 1,
    title: "Páginas Web y Landing Pages de Alto Impacto",
    slug: "paginas-web-y-landing-pages",
    short_description: "Sitios web rápidos, responsivos y con arquitectura orientada a la conversión de leads.",
    detailed_description: "Construimos landing pages y sitios corporativos con tiempos de carga inferiores a 1 segundo, diseño personalizado que comunica autoridad técnica y optimización para campañas publicitarias.",
    features: [
      "Diseño a medida (cero plantillas genéricas)",
      "Optimización Core Web Vitals (Puntuación 95+)",
      "Integración directa con WhatsApp y CRM",
      "SEO técnico y metadatos sociales incluidos"
    ],
    price_display: "Desde $120",
    badge_text: "MÁS SOLICITADO",
    icon_name: "Globe",
    is_pack_pro: false,
    is_featured: true,
    order: 1
  },
  {
    id: 2,
    title: "Catálogos Digitales con Pedido por WhatsApp",
    slug: "catalogos-digitales-whatsapp",
    short_description: "Permite que tus clientes elijan productos y te envíen la orden detallada directamente a tu chat.",
    detailed_description: "La forma más rápida y amigable de vender en Venezuela y Latinoamérica. Sin registros tediosos ni carritos abandonados: el cliente selecciona y el pedido te llega estructurado a tu WhatsApp con totales y detalles.",
    features: [
      "Panel de administración fácil para actualizar precios",
      "Generador de mensajes de orden para WhatsApp",
      "Categorías, búsqueda en tiempo real y fotos HD",
      "Listo para operar en bolívares, dólares o cripto"
    ],
    price_display: "Desde $180",
    badge_text: "ALTA CONVERSIÓN",
    icon_name: "ShoppingCart",
    is_pack_pro: false,
    is_featured: true,
    order: 2
  },
  {
    id: 3,
    title: "Pack Perfil Pro ($15)",
    slug: "pack-perfil-pro",
    short_description: "Transforma tu Instagram en un imán de clientes con identidad profesional en 48 horas.",
    detailed_description: "Diseñado para emprendedores y comercios que necesitan proyectar seriedad y captar mensajes de inmediato en sus redes sociales con mínima inversión.",
    features: [
      "Ajuste estratégico del perfil y biografía",
      "5 portadas de historias destacadas profesionales",
      "1 enlace directo y personalizado a WhatsApp",
      "1 diseño promocional listo para publicar en feed/historias",
      "Asesoría técnica y de imagen personalizada"
    ],
    price_display: "15$",
    badge_text: "OFERTA ESPECIAL 15$",
    icon_name: "Sparkles",
    is_pack_pro: true,
    is_featured: true,
    order: 3
  },
  {
    id: 4,
    title: "Python & Software a Medida",
    slug: "software-a-medida-python",
    short_description: "Sistemas web internos, paneles de control y lógica de negocio adaptada exactamente a tu flujo.",
    detailed_description: "Cuando el software comercial no encaja con tu negocio, desarrollamos sistemas a la medida con Python 3.12, Django y PostgreSQL para optimizar tu operación.",
    features: [
      "Desarrollo backend robusto en Python",
      "Paneles administrativos personalizados",
      "Roles de usuario, permisos y auditoría",
      "Módulos de facturación, inventario o reportes"
    ],
    price_display: "A medida",
    badge_text: "INGENIERÍA AVANZADA",
    icon_name: "Code",
    is_pack_pro: false,
    is_featured: false,
    order: 4
  },
  {
    id: 5,
    title: "Bases de Datos & Automatización",
    slug: "bases-de-datos-automatizacion",
    short_description: "Conexión de sistemas, scripts de extracción de datos y eliminación de tareas manuales repetitivas.",
    detailed_description: "Automatizamos flujos de trabajo completos, sincronización de stocks entre canales y optimización de consultas SQL en PostgreSQL para velocidad extrema.",
    features: [
      "Automatización de tareas periódicas y cron jobs",
      "Sincronización de inventarios y datos",
      "Diseño e indexación de bases de datos SQL",
      "Integración con APIs externas y pasarelas"
    ],
    price_display: "A medida",
    badge_text: "OPTIMIZACIÓN",
    icon_name: "Database",
    is_pack_pro: false,
    is_featured: false,
    order: 5
  },
  {
    id: 6,
    title: "Soporte Técnico, Redes & Servidores",
    slug: "soporte-tecnico-redes-servidores",
    short_description: "Configuración de infraestructura, Linux, Docker, seguridad y asistencia presencial en Zulia.",
    detailed_description: "Mantenimiento preventivo y correctivo para que tu negocio nunca se detenga. Asistencia remota continua y atención presencial especializada en Maracaibo y el Zulia.",
    features: [
      "Soporte remoto y presencial en Zulia",
      "Despliegue y hardening de servidores Linux / Docker",
      "Copias de seguridad automáticas y recuperación ante desastres",
      "Monitoreo 24/7 y respuesta rápida ante incidencias"
    ],
    price_display: "Planes & Soporte",
    badge_text: "PRESENCIAL EN ZULIA",
    icon_name: "Server",
    is_pack_pro: false,
    is_featured: false,
    order: 6
  },
  {
    id: 7,
    title: "Marketing & Diseño de Marca",
    slug: "marketing-diseno-de-marca",
    short_description: "Diseño de logotipos, manuales de identidad visual y contenido publicitario para posicionarte.",
    detailed_description: "Dale a tu negocio la identidad visual que merece. Creamos piezas gráficas profesionales que generan confianza inmediata y diferencian tu marca de la competencia.",
    features: [
      "Diseño y vectorización de logotipos",
      "Kits de marca y paletas de color con contraste",
      "Material para redes sociales y banners",
      "Optimización de imagen corporativa"
    ],
    price_display: "Desde $40",
    badge_text: "CREATIVIDAD",
    icon_name: "Palette",
    is_pack_pro: false,
    is_featured: false,
    order: 7
  }
];

export const fallbackPortfolio: PortfolioItem[] = [
  {
    id: 1,
    title: "NovaStore Zulia • Catálogo WhatsApp",
    slug: "novastore-zulia-catalogo-whatsapp",
    client_name: "NovaStore C.A. (Ejemplo Demo)",
    category: "CATALOG",
    category_display: "Catálogo Digital / WhatsApp",
    summary: "Catálogo interactivo con carrito rápido y checkout directo a WhatsApp para comercio local.",
    description: "Plataforma de catálogo digital diseñada para eliminar la fricción en la compra. Cuenta con búsqueda instantánea, cálculo automático de tasas y generación de pedido formalizado en el chat de WhatsApp del vendedor.",
    technologies: ["React", "TypeScript", "TailwindCSS", "WhatsApp API", "SQLite"],
    metrics_highlight: "+180% Pedidos Cerrados",
    live_url: "https://wa.me/584146040010?text=Hola,%20quisiera%20ver%20una%20demo%20del%20catalogo%20NovaStore",
    github_url: "",
    image_display: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1000&auto=format&fit=crop",
    is_demo_data: true,
    is_featured: true,
    order: 1
  },
  {
    id: 2,
    title: "Maracaibo Medical Cloud • Landing Page & Citas",
    slug: "maracaibo-medical-cloud",
    client_name: "Centro Clínico de Especialidades (Ejemplo Demo)",
    category: "WEB",
    category_display: "Páginas Web y Landings",
    summary: "Landing page de altísima velocidad y agenda de citas médicas con validación en tiempo real.",
    description: "Desarrollo web centrado en accesibilidad, tiempo de respuesta sub-segundo y sistema interactivo de agendamiento de pacientes con confirmación automática por WhatsApp y correo.",
    technologies: ["React 18", "Python", "Django", "PostgreSQL", "Docker"],
    metrics_highlight: "0.38s LCP • 99 Lighthouse",
    live_url: "https://wa.me/584146040010?text=Hola,%20me%20interesa%20un%20sitio%20web%20como%20el%20medico",
    github_url: "",
    image_display: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    is_demo_data: true,
    is_featured: true,
    order: 2
  },
  {
    id: 3,
    title: "Zulia AutoSync • Motor Python de Inventarios",
    slug: "zulia-autosync-motor-python",
    client_name: "Distribuidora Industrial (Ejemplo Demo)",
    category: "SOFTWARE",
    category_display: "Software & Automatización Python",
    summary: "Pipeline de automatización que sincroniza inventario multi-almacén y genera reportes en Excel.",
    description: "Script de alta disponibilidad escrito en Python que monitorea existencias de almacenes, genera alertas de reposición preventiva y actualiza precios en dólares y bolívares en tiempo real.",
    technologies: ["Python 3.12", "Pandas", "SQLAlchemy", "Linux", "Cron"],
    metrics_highlight: "14h semanales ahorradas",
    live_url: "https://wa.me/584146040010?text=Hola,%20quiero%20automatizar%20procesos%20con%20Python",
    github_url: "",
    image_display: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    is_demo_data: true,
    is_featured: false,
    order: 3
  },
  {
    id: 4,
    title: "Pack Perfil Pro • Transformación Café & Bistro",
    slug: "pack-perfil-pro-cafe-bistro",
    client_name: "Origen Café Gourmet (Ejemplo Demo)",
    category: "BRANDING",
    category_display: "Pack Perfil & Marketing",
    summary: "Optimización integral de biografía, 5 portadas de destacadas y embudo de mensajes directos.",
    description: "Implementación del servicio Pack Perfil Pro: reestructuración de la propuesta de valor en biografía, diseño de historias destacadas en alta resolución y enlace directo con saludo predeterminado al WhatsApp.",
    technologies: ["Figma", "Branding", "Social Media UX", "Copywriting"],
    metrics_highlight: "+310% Clics al WhatsApp",
    live_url: "https://wa.me/584146040010?text=Hola,%20quiero%20el%20Pack%20Perfil%20Pro%20de%2015$",
    github_url: "",
    image_display: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    is_demo_data: true,
    is_featured: false,
    order: 4
  }
];

export const fallbackFAQs: FAQItem[] = [
  {
    id: 1,
    question: "¿Cómo es el esquema de pago 50/50?",
    answer: "Para tu total tranquilidad, iniciamos cualquier desarrollo con el 50% de anticipo para cubrir arquitectura, diseño y fase inicial. El 50% restante solo se cancela cuando el proyecto esté terminado, desplegado en tu entorno y validado al 100%.",
    category: "PAGOS",
    order: 1
  },
  {
    id: 2,
    question: "¿Prestan servicio presencial en Venezuela?",
    answer: "Sí. Brindamos atención, reuniones y soporte presencial exclusivamente en el estado Zulia (Maracaibo, San Francisco y zonas aledañas). Para el resto de Venezuela y clientes internacionales, trabajamos de manera 100% remota con canales fluidos.",
    category: "GENERAL",
    order: 2
  },
  {
    id: 3,
    question: "¿Qué incluye exactamente el Pack Perfil Pro de 15$?",
    answer: "Incluye: 1) Ajuste estratégico de biografía y perfil en Instagram, 2) Creación de 5 portadas personalizadas para historias destacadas, 3) 1 enlace directo configurado hacia tu WhatsApp comercial, 4) 1 diseño publicitario listo para postear, y 5) Asesoría personalizada.",
    category: "SERVICIOS",
    order: 3
  },
  {
    id: 4,
    question: "¿Por qué dicen que trabajan 24/7?",
    answer: "Nuestros sistemas de monitoreo técnico, servidores y soporte para incidencias críticas están activos las 24 horas del día, los 7 días de la semana, asegurando que tu plataforma digital nunca se caiga en momentos clave de venta.",
    category: "SOPORTE",
    order: 4
  },
  {
    id: 5,
    question: "¿Cuánto tiempo toma el desarrollo de una página web o catálogo?",
    answer: "Una landing page o catálogo digital por WhatsApp típicamente se entrega en un plazo de 3 a 7 días hábiles. Desarrollos de software a medida se planifican en sprints de 2 a 4 semanas según la complejidad.",
    category: "SERVICIOS",
    order: 5
  }
];

export const api = {
  async getConfig(): Promise<SiteConfig> {
    try {
      const res = await fetch(`${API_BASE}/content/config/`);
      if (!res.ok) throw new Error("Error fetching config");
      return await res.json();
    } catch {
      return fallbackConfig;
    }
  },

  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch(`${API_BASE}/content/services/`);
      if (!res.ok) throw new Error("Error fetching services");
      return await res.json();
    } catch {
      return fallbackServices;
    }
  },

  async getPortfolio(): Promise<PortfolioItem[]> {
    try {
      const res = await fetch(`${API_BASE}/portfolio/projects/`);
      if (!res.ok) throw new Error("Error fetching portfolio");
      return await res.json();
    } catch {
      return fallbackPortfolio;
    }
  },

  async getFAQs(): Promise<FAQItem[]> {
    try {
      const res = await fetch(`${API_BASE}/content/faqs/`);
      if (!res.ok) throw new Error("Error fetching faqs");
      return await res.json();
    } catch {
      return fallbackFAQs;
    }
  },

  async submitLead(data: LeadSubmission): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/leads/submit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.phone?.[0] || json.full_name?.[0] || json.message?.[0] || "Error al procesar mensaje");
      }
      return json;
    } catch (err: any) {
      throw new Error(err.message || "Error al enviar formulario");
    }
  }
};
