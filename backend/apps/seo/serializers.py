from rest_framework import serializers
from .models import PageSEO

class PageSEOSerializer(serializers.ModelSerializer):
    og_image_url = serializers.SerializerMethodField()
    schema_json_ld = serializers.SerializerMethodField()

    class Meta:
        model = PageSEO
        fields = [
            'page_identifier', 'meta_title', 'meta_description', 'meta_keywords',
            'og_title', 'og_description', 'og_image_url', 'canonical_url',
            'schema_type', 'schema_json_ld'
        ]

    def get_og_image_url(self, obj):
        request = self.context.get('request')
        if obj.og_image:
            if request:
                return request.build_absolute_uri(obj.og_image.url)
            return obj.og_image.url
        return "/assets/logo/eztechlabs-social-banner.png"

    def get_schema_json_ld(self, obj):
        # Base schema for Venezuelan professional service
        base_schema = {
            "@context": "https://schema.org",
            "@type": obj.schema_type or "ProfessionalService",
            "name": "EZ Techlabs",
            "image": "https://eztechlabs.com/assets/logo/eztechlabs-icon.png",
            "description": obj.meta_description,
            "url": obj.canonical_url or "https://eztechlabs.com",
            "telephone": "+584146040010",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressRegion": "Zulia",
                "addressCountry": "VE"
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
            },
            "sameAs": [
                "https://instagram.com/ez.techlabs"
            ]
        }
        if obj.structured_data:
            base_schema.update(obj.structured_data)
        return base_schema

