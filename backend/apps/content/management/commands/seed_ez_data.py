from django.core.management.base import BaseCommand
from apps.content.models import SiteConfig, Service, FAQ
from apps.portfolio.models import PortfolioProject
from apps.seo.models import PageSEO

class Command(BaseCommand):
    help = "Seeds initial brand data, services, Pack Pro, FAQs, portfolio, and SEO for EZ Techlabs."

    def handle(self, *args, **options):
        self.stdout.write("Configurando EZ Techlabs...")

        # 1. SiteConfig
        config = SiteConfig.get_solo()
        config.company_name = "EZ Techlabs"
        config.tagline = "Páginas web y software que hacen que tu negocio venda"
        config.hero_headline = "Páginas web y software que hacen que tu negocio venda"
        config.hero_subheadline = "Ingeniería de software limpia, diseño editorial de alto impacto y automatizaciones concebidas para transformar visitas en clientes recurrentes. Cobertura remota global y atención presencial en Zulia."
        config.whatsapp_number = "+58 414 604 0010"
        config.whatsapp_raw = "584146040010"
        config.whatsapp_welcome_message = "¡Hola EZ Techlabs! Vengo de su sitio web y quiero cotizar una solución digital para mi negocio."
        config.instagram_handle = "@ez.techlabs"
        config.instagram_url = "https://instagram.com/ez.techlabs"
        config.contact_email = "zambranoeli2010@gmail.com"
        config.coverage_title = "Cobertura Híbrida & Operación 24/7"
        config.coverage_summary = "Desarrollamos de forma remota para clientes globales y brindamos atención presencial exclusiva en el estado Zulia, Venezuela. Monitoreo y soporte técnico continuo 24/7."
        config.commitment_title = "Compromiso de Confianza 50 / 50"
        config.commitment_description = "Comenzamos tu proyecto con el 50% de anticipo para arrancar arquitectura y diseño, y el 50% restante solo se cancela cuando el trabajo esté culminado, revisado y listo para desplegar."
        config.system_status_text = "OPERACIONAL 24/7 • ESTADO ZULIA, VE"
        config.save()
        self.stdout.write(self.style.SUCCESS("✓ SiteConfig guardado con éxito."))

        # 2. Services
        services_data = [
            {
                "title": "Páginas Web y Landing Pages de Alto Impacto",
                "slug": "paginas-web-y-landing-pages",
                "short_description": "Sitios web rápidos, responsivos y con arquitectura orientada a la conversión de leads.",
                "detailed_description": "Construimos landing pages y sitios corporativos con tiempos de carga inferiores a 1 segundo, diseño personalizado que comunica autoridad técnica y optimización para campañas publicitarias.",
                "features": [
                    "Diseño a medida (cero plantillas genéricas)",
                    "Optimización Core Web Vitals (Puntuación 95+)",
                    "Integración directa con WhatsApp y CRM",
                    "SEO técnico y metadatos sociales incluidos"
                ],
                "price_display": "Cotización a medida",
                "badge_text": "MÁS SOLICITADO",
                "icon_name": "Globe",
                "is_pack_pro": False,
                "is_featured": True,
                "order": 1
            },
            {
                "title": "Catálogos Digitales con Pedido por WhatsApp",
                "slug": "catalogos-digitales-whatsapp",
                "short_description": "Permite que tus clientes elijan productos y te envíen la orden detallada directamente a tu chat.",
                "detailed_description": "La forma más rápida y amigable de vender en Venezuela y Latinoamérica. Sin registros tediosos ni carritos abandonados: el cliente selecciona y el pedido te llega estructurado a tu WhatsApp con totales y detalles.",
                "features": [
                    "Panel de administración fácil para actualizar precios",
                    "Generador de mensajes de orden para WhatsApp",
                    "Categorías, búsqueda en tiempo real y fotos HD",
                    "Listo para operar en bolívares, dólares o cripto"
                ],
                "price_display": "Presupuesto a medida",
                "badge_text": "ALTA CONVERSIÓN",
                "icon_name": "ShoppingCart",
                "is_pack_pro": False,
                "is_featured": True,
                "order": 2
            },
            {
                "title": "Exportación de Documentos & Reportes (Python)",
                "slug": "exportacion-documentos-python",
                "short_description": "Generación automática de reportes en PDF, Excel estructurado y CSV a partir de tus bases de datos con un clic.",
                "detailed_description": "Automatizamos la emisión masiva de facturas, cotizaciones, recibos y reportes financieros con scripts en Python, eliminando la digitación manual y los errores humanos.",
                "features": [
                    "Generación masiva de PDFs corporativos (facturas, cotizaciones, recibos)",
                    "Exportación rápida de inventarios y datos a Excel con fórmulas",
                    "Extracción y consolidación de datos entre sistemas",
                    "Envío automatizado directo por correo o WhatsApp"
                ],
                "price_display": "Automatización a medida",
                "badge_text": "AUTOMATIZACIÓN PYTHON",
                "icon_name": "FileText",
                "is_pack_pro": False,
                "is_featured": True,
                "order": 3
            },
            {
                "title": "Python & Software a Medida",
                "slug": "software-a-medida-python",
                "short_description": "Sistemas web internos, paneles de control y lógica de negocio adaptada exactamente a tu flujo.",
                "detailed_description": "Cuando el software comercial no encaja con tu negocio, desarrollamos sistemas a la medida con Python 3.12, Django y PostgreSQL para optimizar tu operación.",
                "features": [
                    "Desarrollo backend robusto en Python",
                    "Paneles administrativos personalizados",
                    "Roles de usuario, permisos y auditoría",
                    "Módulos de facturación, inventario o reportes"
                ],
                "price_display": "A medida",
                "badge_text": "INGENIERÍA AVANZADA",
                "icon_name": "Code",
                "is_pack_pro": False,
                "is_featured": False,
                "order": 4
            },
            {
                "title": "Bases de Datos & Automatización",
                "slug": "bases-de-datos-automatizacion",
                "short_description": "Conexión de sistemas, scripts de extracción de datos y eliminación de tareas manuales repetitivas.",
                "detailed_description": "Automatizamos flujos de trabajo completos, sincronización de stocks entre canales y optimización de consultas SQL en PostgreSQL para velocidad extrema.",
                "features": [
                    "Automatización de tareas periódicas y cron jobs",
                    "Sincronización de inventarios y datos",
                    "Diseño e indexación de bases de datos SQL",
                    "Integración con APIs externas y pasarelas"
                ],
                "price_display": "A medida",
                "badge_text": "OPTIMIZACIÓN",
                "icon_name": "Database",
                "is_pack_pro": False,
                "is_featured": False,
                "order": 5
            },
            {
                "title": "Soporte Técnico, Redes & Servidores",
                "slug": "soporte-tecnico-redes-servidores",
                "short_description": "Configuración de infraestructura, Linux, Docker, seguridad y asistencia presencial en Zulia.",
                "detailed_description": "Mantenimiento preventivo y correctivo para que tu negocio nunca se detenga. Asistencia remota continua y atención presencial especializada en el estado Zulia.",
                "features": [
                    "Soporte remoto y presencial en Zulia",
                    "Despliegue y hardening de servidores Linux / Docker",
                    "Copias de seguridad automáticas y recuperación ante desastres",
                    "Monitoreo 24/7 y respuesta rápida ante incidencias"
                ],
                "price_display": "Planes & Soporte",
                "badge_text": "PRESENCIAL EN ZULIA",
                "icon_name": "Server",
                "is_pack_pro": False,
                "is_featured": False,
                "order": 6
            },
            {
                "title": "Consultoría & Asesoría Tecnológica",
                "slug": "consultoria-asesoria-tecnologica",
                "short_description": "Evaluamos tu modelo de negocio para definir qué tecnología te conviene adoptar, evitando compras de software inútil y optimizando tus costos operativos.",
                "detailed_description": "Acompañamiento técnico estratégico para negocios en el Zulia y remoto. Te ayudamos a seleccionar arquitectura de software, automatizaciones y proveedores adecuados.",
                "features": [
                    "Diagnóstico técnico de sistemas, procesos y canales de venta",
                    "Selección estratégica de tecnología (Python, bases de datos, hosting)",
                    "Sesiones 1 a 1 de asesoría técnica presencial en Zulia o virtual",
                    "Planes de modernización paso a paso para tu equipo"
                ],
                "price_display": "Asesoría personalizada",
                "badge_text": "ESTRATEGIA & NEGOCIOS",
                "icon_name": "Lightbulb",
                "is_pack_pro": False,
                "is_featured": False,
                "order": 7
            }
        ]

        for s_data in services_data:
            Service.objects.update_or_create(slug=s_data['slug'], defaults=s_data)
        self.stdout.write(self.style.SUCCESS(f"✓ {len(services_data)} Servicios configurados."))

        # 3. FAQs
        faqs_data = [
            {
                "question": "¿Cómo es el esquema de pago 50/50?",
                "answer": "Para tu total tranquilidad, iniciamos cualquier desarrollo con el 50% de anticipo para cubrir arquitectura, diseño y fase inicial. El 50% restante solo se cancela cuando el proyecto esté terminado, desplegado en tu entorno y validado al 100%.",
                "category": "PAGOS",
                "order": 1
            },
            {
                "question": "¿Prestan servicio presencial en Venezuela?",
                "answer": "Sí. Brindamos atención, reuniones y soporte presencial en el estado Zulia. Para el resto de Venezuela y clientes internacionales, trabajamos de manera 100% remota con canales fluidos.",
                "category": "GENERAL",
                "order": 2
            },
            {
                "question": "¿Cómo funciona la consultoría y asesoría tecnológica?",
                "answer": "Analizamos tus requerimientos operativos y comerciales para recomendarte la solución exacta: landing page, catálogo por WhatsApp o automatizaciones con Python a medida.",
                "category": "SERVICIOS",
                "order": 3
            },
            {
                "question": "¿Por qué dicen que trabajan 24/7?",
                "answer": "Nuestros sistemas de monitoreo técnico, servidores y soporte para incidencias críticas están activos las 24 horas del día, los 7 días de la semana, asegurando que tu plataforma digital nunca se caiga en momentos clave de venta.",
                "category": "SOPORTE",
                "order": 4
            },
            {
                "question": "¿Cuánto tiempo toma el desarrollo de una página web o catálogo?",
                "answer": "Una landing page o catálogo digital por WhatsApp típicamente se entrega en un plazo de 3 a 7 días hábiles. Desarrollos de software a medida se planifican en sprints de 2 a 4 semanas según la complejidad.",
                "category": "SERVICIOS",
                "order": 5
            }
        ]

        for f_data in faqs_data:
            FAQ.objects.update_or_create(question=f_data['question'], defaults=f_data)
        self.stdout.write(self.style.SUCCESS(f"✓ {len(faqs_data)} FAQs configuradas."))

        # 4. Portfolio Projects (Demostración claramente marcada)
        portfolio_data = [
            {
                "title": "NovaStore Zulia • Catálogo WhatsApp",
                "slug": "novastore-zulia-catalogo-whatsapp",
                "client_name": "NovaStore C.A. (Ejemplo Demo)",
                "category": "CATALOG",
                "summary": "Catálogo interactivo con carrito rápido y checkout directo a WhatsApp para comercio local.",
                "description": "Plataforma de catálogo digital diseñada para eliminar la fricción en la compra. Cuenta con búsqueda instantánea, cálculo automático de tasas y generación de pedido formalizado en el chat de WhatsApp del vendedor.",
                "technologies": ["React", "TypeScript", "TailwindCSS", "WhatsApp API", "SQLite"],
                "metrics_highlight": "+180% Pedidos Cerrados",
                "live_url": "https://wa.me/584146040010?text=Hola,%20quisiera%20ver%20una%20demo%20del%20catalogo%20NovaStore",
                "image_url_fallback": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1000&auto=format&fit=crop",
                "is_demo_data": True,
                "is_featured": True,
                "order": 1
            },
            {
                "title": "Maracaibo Medical Cloud • Landing Page & Citas",
                "slug": "maracaibo-medical-cloud",
                "client_name": "Centro Clínico de Especialidades (Ejemplo Demo)",
                "category": "WEB",
                "summary": "Landing page de altísima velocidad y agenda de citas médicas con validación en tiempo real.",
                "description": "Desarrollo web centrado en accesibilidad, tiempo de respuesta sub-segundo y sistema interactivo de agendamiento de pacientes con confirmación automática por WhatsApp y correo.",
                "technologies": ["React 18", "Python", "Django", "PostgreSQL", "Docker"],
                "metrics_highlight": "0.38s LCP • 99 Lighthouse",
                "live_url": "https://wa.me/584146040010?text=Hola,%20me%20interesa%20un%20sitio%20web%20como%20el%20medico",
                "image_url_fallback": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
                "is_demo_data": True,
                "is_featured": True,
                "order": 2
            },
            {
                "title": "Zulia AutoSync • Motor Python de Inventarios",
                "slug": "zulia-autosync-motor-python",
                "client_name": "Distribuidora Industrial (Ejemplo Demo)",
                "category": "SOFTWARE",
                "summary": "Pipeline de automatización que sincroniza inventario multi-almacén y genera reportes en Excel.",
                "description": "Script de alta disponibilidad escrito en Python que monitorea existencias de almacenes, genera alertas de reposición preventiva y actualiza precios en dólares y bolívares en tiempo real.",
                "technologies": ["Python 3.12", "Pandas", "SQLAlchemy", "Linux", "Cron"],
                "metrics_highlight": "14h semanales ahorradas",
                "live_url": "https://wa.me/584146040010?text=Hola,%20quiero%20automatizar%20procesos%20con%20Python",
                "image_url_fallback": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
                "is_demo_data": True,
                "is_featured": False,
                "order": 3
            },
            {
                "title": "Pack Perfil Pro • Transformación Café & Bistro",
                "slug": "pack-perfil-pro-cafe-bistro",
                "client_name": "Origen Café Gourmet (Ejemplo Demo)",
                "category": "BRANDING",
                "summary": "Optimización integral de biografía, 5 portadas de destacadas y embudo de mensajes directos.",
                "description": "Implementación del servicio Pack Perfil Pro: reestructuración de la propuesta de valor en biografía, diseño de historias destacadas en alta resolución y enlace directo con saludo predeterminado al WhatsApp.",
                "technologies": ["Figma", "Branding", "Social Media UX", "Copywriting"],
                "metrics_highlight": "+310% Clics al WhatsApp",
                "live_url": "https://wa.me/584146040010?text=Hola,%20quiero%20el%20Pack%20Perfil%20Pro%20de%2015$",
                "image_url_fallback": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
                "is_demo_data": True,
                "is_featured": False,
                "order": 4
            }
        ]

        for p_data in portfolio_data:
            PortfolioProject.objects.update_or_create(slug=p_data['slug'], defaults=p_data)
        self.stdout.write(self.style.SUCCESS(f"✓ {len(portfolio_data)} Proyectos de demostración cargados."))

        # 5. Page SEO
        seo_data = [
            {
                "page_identifier": "home",
                "meta_title": "EZ Techlabs | Páginas Web y Software a Medida en Zulia, Venezuela",
                "meta_description": "Desarrollamos páginas web y software en Zulia, Venezuela. Catálogos digitales con WhatsApp, automatizaciones en Python y Pack Perfil Pro a $15. Operación técnica 24/7.",
                "meta_keywords": "páginas web Zulia, desarrollo web Maracaibo, software Venezuela, catálogo WhatsApp, programadores Python, EZ Techlabs, Pack Perfil Pro",
                "og_title": "EZ Techlabs | Páginas Web y Software que Hacen Vender a tu Negocio",
                "og_description": "Estudio de ingeniería de software y desarrollo web en Maracaibo, Zulia. Atención presencial y remota. Soporte 24/7 y garantía 50/50.",
                "canonical_url": "https://eztechlabs.com",
                "schema_type": "ProfessionalService"
            }
        ]

        for s_item in seo_data:
            PageSEO.objects.update_or_create(page_identifier=s_item['page_identifier'], defaults=s_item)
        self.stdout.write(self.style.SUCCESS("✓ Metadatos SEO iniciales creados."))

        self.stdout.write(self.style.SUCCESS("\n¡Base de datos sembrada y lista para EZ Techlabs!"))

