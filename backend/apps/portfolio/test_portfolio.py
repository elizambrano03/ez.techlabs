from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.portfolio.models import PortfolioProject

class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = PortfolioProject.objects.create(
            title="Proyecto Demo Zulia",
            slug="proyecto-demo-zulia",
            client_name="Cliente Ejemplo",
            category="WEB",
            summary="Sitio web de prueba",
            description="Descripción técnica completa",
            technologies=["React", "Python"],
            is_demo_data=True,
            is_featured=True,
            order=1
        )

    def test_portfolio_list(self):
        response = self.client.get(reverse('portfolio-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertTrue(response.data[0]['is_demo_data'])

    def test_portfolio_detail(self):
        response = self.client.get(reverse('portfolio-detail', kwargs={'slug': 'proyecto-demo-zulia'}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Proyecto Demo Zulia")
