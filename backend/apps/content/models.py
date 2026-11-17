from django.db import models

class SiteConfig(models.Model):
    """
    Singleton model for global site configuration, contact information,
    and hero copy editable directly from the admin panel without touching code.
    """
    company_name = models.CharField(max_length=120, default="EZ Techlabs")
    tagline = models.CharField(
        max_length=255,
        default="Páginas web y software que hacen que tu negocio venda"
    )
    hero_headline = models.CharField(
        max_length=255,
        default="Páginas web y software que hacen que tu negocio venda"
    )
    hero_subheadline = models.TextField(
        default="Diseño de vanguardia, arquitectura limpia y código a medida. En EZ Techlabs construimos activos digitales concebidos específicamente para generar ventas y automatizar tus procesos."
    )
    whatsapp_number = models.CharField(max_length=40, default="+58 414 604 0010")
    whatsapp_raw = models.CharField(
        max_length=30,
        default="584146040010",
        help_text="Número internacional sin signos para links de WhatsApp"
    )
    whatsapp_welcome_message = models.CharField(
        max_length=255,
        default="¡Hola EZ Techlabs! Vengo de su sitio web y quiero cotizar un proyecto digital."
    )
    instagram_handle = models.CharField(max_length=60, default="@ez.techlabs")
    instagram_url = models.URLField(default="https://instagram.com/ez.techlabs")
    contact_email = models.EmailField(default="zambranoeli2010@gmail.com")
    coverage_title = models.CharField(
        max_length=150,
        default="Cobertura y Operación Técnica"
    )
    coverage_summary = models.TextField(
        default="Desarrollo remoto para clientes globales y atención presencial exclusiva en el estado Zulia, Venezuela. Operación y monitoreo técnico 24/7."
    )
    commitment_title = models.CharField(
        max_length=150,
        default="Compromiso de Confianza 50/50"
    )
    commitment_description = models.TextField(
        default="Trabajamos con total transparencia: se inicia el proyecto con el 50% de anticipo y el 50% restante se liquida únicamente cuando el trabajo esté culminado, revisado y listo para desplegar."
    )
    system_status_text = models.CharField(
        max_length=80,
        default="OPERACIONAL 24/7 • MARACAIBO, VE"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Configuración Global del Sitio"
        verbose_name_plural = "Configuración Global del Sitio"

    def __str__(self):
        return f"{self.company_name} - Ajustes Generales"

    def save(self, *args, **kwargs):
        # Enforce singleton
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_solo(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Service(models.Model):
    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=200, unique=True)
    short_description = models.TextField(
        help_text="Descripción compacta para tarjetas y vistas previas"
    )
    detailed_description = models.TextField(
        blank=True,
        help_text="Descripción extendida y enfoque técnico"
    )
    features = models.JSONField(
        default=list,
        help_text="Lista de viñetas o entregables incluidos en formato JSON"
    )
    price_display = models.CharField(
        max_length=80,
        blank=True,
        default="A medida",
        help_text="Texto o monto visible (ej: 15$, A medida, Desde 80$)"
    )
    badge_text = models.CharField(
        max_length=60,
        blank=True,
        help_text="Insignia destacada (ej: POPULAR, PACK ESPECIAL, RECOMENDADO)"
    )
    icon_name = models.CharField(
        max_length=60,
        default="Code",
        help_text="Nombre de ícono Lucide (ej: Globe, ShoppingCart, Cpu, Server, Instagram, Sparkles)"
    )
    is_pack_pro = models.BooleanField(
        default=False,
        help_text="Marcar si es el Pack Perfil Pro de 15$"
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Destacar en bento grid principal con mayor jerarquía visual"
    )
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Servicio"
        verbose_name_plural = "Servicios"

    def __str__(self):
        return f"{self.title} ({self.price_display})"


class FAQ(models.Model):
    CATEGORY_CHOICES = [
        ('GENERAL', 'General y Cobertura'),
        ('PAGOS', 'Pagos y Garantía 50/50'),
        ('SERVICIOS', 'Servicios y Tiempos de Entrega'),
        ('SOPORTE', 'Soporte y Operación 24/7'),
    ]

    question = models.CharField(max_length=255)
    answer = models.TextField()
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES, default='GENERAL')
    order = models.PositiveIntegerField(default=0, db_index=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Pregunta Frecuente (FAQ)"
        verbose_name_plural = "Preguntas Frecuentes (FAQs)"

    def __str__(self):
        return self.question

