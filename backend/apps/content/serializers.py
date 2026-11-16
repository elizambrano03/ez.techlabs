from rest_framework import serializers
from .models import SiteConfig, Service, FAQ

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description', 'detailed_description',
            'features', 'price_display', 'badge_text', 'icon_name',
            'is_pack_pro', 'is_featured', 'order'
        ]

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'category', 'order']

