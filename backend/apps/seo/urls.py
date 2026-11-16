from django.urls import path
from .views import PageSEOListView, PageSEODetailView

urlpatterns = [
    path('pages/', PageSEOListView.as_view(), name='seo-page-list'),
    path('pages/<str:identifier>/', PageSEODetailView.as_view(), name='seo-page-detail'),
]

