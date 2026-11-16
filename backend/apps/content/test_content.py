from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.content.models import SiteConfig, Service, FAQ

class ContentAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.config = SiteConfig.objects.create(
            company_name="EZ Techlabs",
            whatsapp_number="+58 414 604 0010",
            whatsapp_raw="584146040010"
        )
        self.pack_pro = Service.objects.create(
            title="Pack Perfil Pro ($15)",
            slug="pack-perfil-pro",
            short_description="Optimización de Instagram",
            price_display="15$",
            is_pack_pro=True,
            is_active=True,
            order=1
        )
        self.faq = FAQ.objects.create(
            question="¿Esquema 50/50?",
            answer="50% inicial y 50% al finalizar",
            category="PAGOS",
            order=1
        )

    def test_site_config_endpoint(self):
        response = self.client.get(reverse('site-config'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['company_name'], "EZ Techlabs")
        self.assertEqual(response.data['whatsapp_raw'], "584146040010")

    def test_service_list_endpoint(self):
        response = self.client.get(reverse('service-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_pack_pro_endpoint(self):
        response = self.client.get(reverse('pack-pro-detail'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['is_pack_pro'])
        self.assertEqual(response.data['price_display'], "15$")

    def test_faq_list_endpoint(self):
        response = self.client.get(reverse('faq-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
