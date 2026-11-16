from rest_framework import generics, permissions
from .models import PortfolioProject
from .serializers import PortfolioProjectSerializer

class PortfolioListView(generics.ListAPIView):
    """Returns all portfolio projects with optional category filter"""
    permission_classes = [permissions.AllowAny]
    serializer_class = PortfolioProjectSerializer
    pagination_class = None

    def get_queryset(self):
        category = self.request.query_params.get('category')
        qs = PortfolioProject.objects.all()
        if category:
            qs = qs.filter(category=category.upper())
        return qs.order_by('order', '-created_at')


class PortfolioDetailView(generics.RetrieveAPIView):
    """Returns single project by slug"""
    permission_classes = [permissions.AllowAny]
    serializer_class = PortfolioProjectSerializer
    lookup_field = 'slug'
    queryset = PortfolioProject.objects.all()

