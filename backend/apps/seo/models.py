from django.db import models

class PageSEO(models.Model):
    PAGE_CHOICES = [
        ('home', 'Página de Inicio (Home)'),
        ('services', 'Servicios y Soluciones'),
        ('pack_pro', 'Pack Perfil Pro ($15)'),
        ('portfolio', 'Portafolio de Software y Web'),
        ('contact', 'Contacto y Cotizaciones'),
    ]

    page_identifier = models.CharField(
        max_length=60,
        choices=PAGE_CHOICES,
        unique=True,
        verbose_name="Identificador de Página"
    )
    meta_title = models.CharField(
        max_length=160,
        default="EZ Techlabs | Páginas Web y Software a Medida en Zulia, Venezuela",
        verbose_name="Título SEO (Meta Title)"
    )
    meta_description = models.TextField(
        max_length=320,
        default="Desarrollo de páginas web de alto impacto, catálogos digitales con WhatsApp, software a medida en Python y automatizaciones. Operación 24/7 y atención en Zulia, Venezuela.",
        verbose_name="Meta Descripción"
    )
    meta_keywords = models.CharField(
        max_length=255,
        blank=True,
        default="páginas web Venezuela, software Zulia, desarrollo web Maracaibo, catálogo WhatsApp, programadores Python, EZ Techlabs",
        verbose_name="Palabras Clave (Keywords)"
    )
    og_title = models.CharField(
        max_length=160,
        blank=True,
        verbose_name="Título Open Graph (Facebook / LinkedIn / WhatsApp)"
    )
    og_description = models.TextField(
        max_length=320,
        blank=True,
        verbose_name="Descripción Open Graph"
    )
    og_image = models.ImageField(
        upload_to='seo/',
        blank=True,
        null=True,
        verbose_name="Imagen Social Share (1200x630)"
    )
    canonical_url = models.URLField(
        blank=True,
        default="https://eztechlabs.com",
        verbose_name="URL Canónica"
    )
    schema_type = models.CharField(
        max_length=80,
        default="ProfessionalService",
        verbose_name="Tipo de Schema.org"
    )
    structured_data = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="JSON-LD Estructurado Adicional"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "SEO y Metadatos de Página"
        verbose_name_plural = "SEO y Metadatos de Páginas"

    def __str__(self):
        return f"SEO: {self.get_page_identifier_display()}"

