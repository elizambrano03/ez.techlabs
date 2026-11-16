from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PageSEO
from .serializers import PageSEOSerializer

class PageSEOListView(generics.ListAPIView):
    """Returns list of SEO records for all pages"""
    permission_classes = [permissions.AllowAny]
    serializer_class = PageSEOSerializer
    queryset = PageSEO.objects.all()
    pagination_class = None

class PageSEODetailView(APIView):
    """Returns SEO config for a specific page by identifier, e.g. 'home'"""
    permission_classes = [permissions.AllowAny]

    def get(self, request, identifier='home'):
        seo_obj = PageSEO.objects.filter(page_identifier=identifier).first()
        if not seo_obj:
            # Fallback to home
            seo_obj = PageSEO.objects.filter(page_identifier='home').first()
        if not seo_obj:
            seo_obj = PageSEO.objects.create(page_identifier=identifier)
        serializer = PageSEOSerializer(seo_obj, context={'request': request})
        return Response(serializer.data)

