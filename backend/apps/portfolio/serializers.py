from rest_framework import serializers
from .models import PortfolioProject

class PortfolioProjectSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    image_display = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioProject
        fields = [
            'id', 'title', 'slug', 'client_name', 'category', 'category_display',
            'summary', 'description', 'technologies', 'metrics_highlight',
            'live_url', 'github_url', 'cover_image', 'image_url_fallback',
            'image_display', 'is_demo_data', 'is_featured', 'order', 'created_at'
        ]

    def get_image_display(self, obj):
        request = self.context.get('request')
        if obj.cover_image:
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
            return obj.cover_image.url
        return obj.image_url_fallback or ""

