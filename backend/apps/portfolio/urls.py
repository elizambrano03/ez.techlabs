from django.urls import path
from .views import PortfolioListView, PortfolioDetailView

urlpatterns = [
    path('projects/', PortfolioListView.as_view(), name='portfolio-list'),
    path('projects/<slug:slug>/', PortfolioDetailView.as_view(), name='portfolio-detail'),
]

