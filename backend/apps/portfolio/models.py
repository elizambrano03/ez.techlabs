from django.db import models

class PortfolioProject(models.Model):
    CATEGORY_CHOICES = [
        ('WEB', 'Páginas Web y Landings'),
        ('CATALOG', 'Catálogo Digital / WhatsApp'),
        ('SOFTWARE', 'Software & Automatización Python'),
        ('BRANDING', 'Pack Perfil & Marketing'),
    ]

    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=200, unique=True)
    client_name = models.CharField(max_length=120, default="Cliente Confidencial / Demo")
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='WEB')
    summary = models.CharField(
        max_length=255,
        help_text="Resumen conciso del resultado o función principal"
    )
    description = models.TextField(
        help_text="Descripción detallada de la arquitectura y valor entregado"
    )
    technologies = models.JSONField(
        default=list,
        help_text="Lista de tecnologías utilizadas (ej: ['React', 'Python', 'Docker', 'PostgreSQL'])"
    )
    metrics_highlight = models.CharField(
        max_length=80,
        blank=True,
        help_text="Métrica clave destacada (ej: '+220% Ventas por WhatsApp', '0.4s LCP')"
    )
    live_url = models.URLField(blank=True, help_text="Enlace a la demo o sitio en vivo")
    github_url = models.URLField(blank=True, help_text="Repositorio público si aplica")
    cover_image = models.ImageField(
        upload_to='portfolio/',
        blank=True,
        null=True,
        help_text="Captura o mockup del proyecto"
    )
    image_url_fallback = models.URLField(
        blank=True,
        help_text="URL de respaldo o imagen mock mientras se sube el archivo final"
    )
    is_demo_data = models.BooleanField(
        default=True,
        db_index=True,
        help_text="INDICADOR VISUAL: Marcar como Verdadero si es un proyecto de muestra / plantilla que el usuario debe reemplazar."
    )
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Proyecto de Portafolio"
        verbose_name_plural = "Proyectos de Portafolio"

    def __str__(self):
        demo_badge = "[DEMO] " if self.is_demo_data else "[REAL] "
        return f"{demo_badge}{self.title} ({self.get_category_display()})"

