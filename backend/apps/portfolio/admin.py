from django.contrib import admin
from django.utils.html import format_html
from .models import PortfolioProject

@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'client_name', 'demo_status_badge', 'is_featured', 'order', 'created_at')
    list_editable = ('is_featured', 'order')
    list_filter = ('is_demo_data', 'category', 'is_featured')
    search_fields = ('title', 'summary', 'description', 'client_name')
    prepopulated_fields = {'slug': ('title',)}

    fieldsets = (
        ('Identificación y Estado', {
            'fields': ('title', 'slug', 'client_name', 'category', 'is_demo_data', 'is_featured', 'order'),
            'description': 'NOTA: Los elementos marcados con "Es Dato de Demostración" están pensados para ser sustituidos por tus proyectos reales.'
        }),
        ('Descripción y Métricas', {
            'fields': ('summary', 'description', 'metrics_highlight', 'technologies')
        }),
        ('Enlaces y Recursos Visuales', {
            'fields': ('live_url', 'github_url', 'cover_image', 'image_url_fallback')
        }),
    )

    def demo_status_badge(self, obj):
        if obj.is_demo_data:
            return format_html(
                '<span style="background-color: #ff9800; color: #000; font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 11px;">REEMPLAZAR (DEMO)</span>'
            )
        return format_html(
            '<span style="background-color: #A6F20F; color: #0C1214; font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 11px;">PROYECTO REAL</span>'
        )
    demo_status_badge.short_description = "Tipo de Registro"

