import csv
from django.contrib import admin
from django.http import HttpResponse
from django.utils.html import format_html
from .models import ContactLead

@admin.action(description="Exportar mensajes seleccionados a CSV")
def export_leads_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv; charset=utf-8-sig')
    response['Content-Disposition'] = 'attachment; filename="leads_ez_techlabs.csv"'
    writer = csv.writer(response)
    writer.writerow([
        'ID', 'Fecha', 'Nombre Completo', 'Empresa', 'Email', 'Teléfono/WhatsApp',
        'Servicio', 'Presupuesto', 'Mensaje', 'Estado', 'IP', 'Spam'
    ])
    for lead in queryset:
        writer.writerow([
            lead.id,
            lead.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            lead.full_name,
            lead.business_name,
            lead.email,
            lead.phone,
            lead.get_service_interest_display(),
            lead.budget_range,
            lead.message.replace('\n', ' '),
            lead.get_status_display(),
            lead.ip_address or '',
            'SÍ' if lead.is_spam else 'NO'
        ])
    return response


@admin.register(ContactLead)
class ContactLeadAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 'phone', 'service_interest', 'status_badge',
        'business_name', 'created_at', 'is_spam'
    )
    list_editable = ()
    list_filter = ('status', 'service_interest', 'is_spam', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'business_name', 'message')
    readonly_fields = ('created_at', 'updated_at', 'ip_address', 'user_agent', 'is_spam')
    actions = [export_leads_csv]

    fieldsets = (
        ('Datos del Solicitante', {
            'fields': ('full_name', 'business_name', 'email', 'phone')
        }),
        ('Proyecto y Requerimientos', {
            'fields': ('service_interest', 'budget_range', 'message')
        }),
        ('Gestión y Seguimiento Comercial', {
            'fields': ('status', 'notes_admin')
        }),
        ('Auditoría y Seguridad', {
            'fields': ('is_spam', 'ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def status_badge(self, obj):
        colors = {
            'NUEVO': '#2196F3',
            'EN_PROCESO': '#FF9800',
            'CONTACTADO': '#9C27B0',
            'CERRADO': '#A6F20F',
            'DESCARTADO': '#757575',
            'SPAM': '#F44336',
        }
        text_color = '#0C1214' if obj.status in ('CERRADO', 'EN_PROCESO') else '#FFFFFF'
        color = colors.get(obj.status, '#757575')
        return format_html(
            '<span style="background-color: {}; color: {}; font-weight: 700; padding: 4px 8px; border-radius: 4px; font-size: 11px;">{}</span>',
            color, text_color, obj.get_status_display()
        )
    status_badge.short_description = "Estado"

