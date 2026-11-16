from django.contrib import admin
from .models import PageSEO

@admin.register(PageSEO)
class PageSEOAdmin(admin.ModelAdmin):
    list_display = ('page_identifier', 'meta_title', 'schema_type', 'updated_at')
    list_filter = ('schema_type',)
    search_fields = ('meta_title', 'meta_description', 'meta_keywords')

    fieldsets = (
        ('Página y Título', {
            'fields': ('page_identifier', 'meta_title', 'meta_description', 'meta_keywords', 'canonical_url')
        }),
        ('Open Graph / Redes Sociales', {
            'fields': ('og_title', 'og_description', 'og_image')
        }),
        ('Schema.org y Datos Estructurados', {
            'fields': ('schema_type', 'structured_data')
        }),
    )

