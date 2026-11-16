from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteConfig, Service, FAQ
from .serializers import SiteConfigSerializer, ServiceSerializer, FAQSerializer

class SiteConfigView(APIView):
    """Returns the singleton site configuration and content"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.get_solo()
        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)


class ServiceListView(generics.ListAPIView):
    """Returns all active services ordered by display priority"""
    permission_classes = [permissions.AllowAny]
    serializer_class = ServiceSerializer
    pagination_class = None

    def get_queryset(self):
        return Service.objects.filter(is_active=True).order_by('order', 'id')


class PackProDetailView(APIView):
    """Shortcut endpoint to fetch the Pack Perfil Pro ($15) details"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        service = Service.objects.filter(is_pack_pro=True, is_active=True).first()
        if not service:
            return Response({"detail": "Pack Pro no configurado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ServiceSerializer(service)
        return Response(serializer.data)


class FAQListView(generics.ListAPIView):
    """Returns all active FAQs grouped or ordered"""
    permission_classes = [permissions.AllowAny]
    serializer_class = FAQSerializer
    pagination_class = None

    def get_queryset(self):
        category = self.request.query_params.get('category')
        qs = FAQ.objects.filter(is_active=True)
        if category:
            qs = qs.filter(category=category.upper())
        return qs.order_by('order', 'id')

