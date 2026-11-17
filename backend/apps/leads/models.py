from django.db import models

class ContactLead(models.Model):
    STATUS_CHOICES = [
        ('NUEVO', 'Nuevo / Sin Atender'),
        ('EN_PROCESO', 'En Evaluación Técnica'),
        ('CONTACTADO', 'Contactado por WhatsApp/Correo'),
        ('CERRADO', 'Proyecto Concretado'),
        ('DESCARTADO', 'No Calificado / Descartado'),
        ('SPAM', 'Detección de Spam'),
    ]

    SERVICE_CHOICES = [
        ('WEB', 'Páginas Web y Landing Pages'),
        ('CATALOG', 'Catálogo Digital con Pedido por WhatsApp'),
        ('SOFTWARE', 'Software a Medida / Python'),
        ('DOCS_PYTHON', 'Exportación de Documentos & Reportes (Python)'),
        ('DATABASE', 'Bases de Datos & Servidores'),
        ('CONSULTING', 'Consultoría & Asesoría Tecnológica'),
        ('MARKETING', 'Diseño Gráfico / Identidad Visual'),
        ('PACK_PRO', 'Pack Perfil Pro (Histórico)'),
        ('OTRO', 'Consulta General / Otra Solución'),
    ]

    full_name = models.CharField(max_length=150, verbose_name="Nombre Completo")
    business_name = models.CharField(max_length=150, blank=True, verbose_name="Nombre del Negocio o Empresa")
    email = models.EmailField(verbose_name="Correo Electrónico")
    phone = models.CharField(max_length=50, verbose_name="Teléfono / WhatsApp")
    service_interest = models.CharField(
        max_length=30,
        choices=SERVICE_CHOICES,
        default='WEB',
        verbose_name="Servicio de Interés"
    )
    budget_range = models.CharField(
        max_length=80,
        blank=True,
        verbose_name="Rango de Presupuesto Estimado"
    )
    message = models.TextField(verbose_name="Detalles del Proyecto")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='NUEVO',
        db_index=True,
        verbose_name="Estado de Gestión"
    )
    notes_admin = models.TextField(
        blank=True,
        verbose_name="Notas Internas de Seguimiento"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        verbose_name="Dirección IP de Origen"
    )
    user_agent = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Navegador / Dispositivo"
    )
    is_spam = models.BooleanField(
        default=False,
        db_index=True,
        verbose_name="Marcado como Spam"
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Fecha de Recepción")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Actualización")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Mensaje de Contacto (Lead)"
        verbose_name_plural = "Mensajes de Contacto (Leads)"

    def __str__(self):
        return f"[{self.get_status_display()}] {self.full_name} ({self.phone})"

