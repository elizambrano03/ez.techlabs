from django.contrib import admin
from .models import SiteConfig, Service, FAQ

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'tagline', 'whatsapp_number', 'instagram_handle', 'updated_at')
    fieldsets = (
        ('Identidad Principal', {
            'fields': ('company_name', 'tagline', 'system_status_text')
        }),
        ('Hero y Textos de Portada', {
            'fields': ('hero_headline', 'hero_subheadline')
        }),
        ('Contacto y Redes (Venezuela & Global)', {
            'fields': ('whatsapp_number', 'whatsapp_raw', 'whatsapp_welcome_message', 'instagram_handle', 'instagram_url', 'contact_email')
        }),
        ('Garantía y Operación Regional', {
            'fields': ('coverage_title', 'coverage_summary', 'commitment_title', 'commitment_description')
        }),
    )

    def has_add_permission(self, request):
        # Prevent creating more than one config instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price_display', 'is_pack_pro', 'is_featured', 'order', 'is_active')
    list_editable = ('price_display', 'order', 'is_active', 'is_featured')
    search_fields = ('title', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_pack_pro', 'is_featured', 'is_active')


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order', 'is_active')
    list_editable = ('order', 'is_active', 'category')
    search_fields = ('question', 'answer')
    list_filter = ('category', 'is_active')

