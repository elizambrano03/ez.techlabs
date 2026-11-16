from django.urls import path
from .views import SiteConfigView, ServiceListView, PackProDetailView, FAQListView

urlpatterns = [
    path('config/', SiteConfigView.as_view(), name='site-config'),
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('services/pack-pro/', PackProDetailView.as_view(), name='pack-pro-detail'),
    path('faqs/', FAQListView.as_view(), name='faq-list'),
]

