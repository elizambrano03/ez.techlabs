from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "EZ Techlabs - Centro de Control"
admin.site.site_title = "EZ Techlabs Admin"
admin.site.index_title = "Gestión de Plataforma y Leads"

admin_path = getattr(settings, 'ADMIN_URL_PATH', 'gestor-ez/')

urlpatterns = [
    path(admin_path, admin.site.urls),
    path('api/v1/content/', include('apps.content.urls')),
    path('api/v1/portfolio/', include('apps.portfolio.urls')),
    path('api/v1/leads/', include('apps.leads.urls')),
    path('api/v1/seo/', include('apps.seo.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

