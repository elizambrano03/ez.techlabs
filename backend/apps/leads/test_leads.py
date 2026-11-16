from django.test import TestCase
from django.urls import reverse
from django.core.cache import cache
from rest_framework.test import APIClient
from rest_framework import status
from apps.leads.models import ContactLead

class LeadsAPITests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.url = reverse('contact-submit')

    def test_valid_lead_submission(self):
        payload = {
            "full_name": "Carlos Mendoza",
            "business_name": "Inversiones Maracaibo C.A.",
            "email": "carlos@inversionesmaracaibo.com",
            "phone": "+58 414 123 4567",
            "service_interest": "CATALOG",
            "budget_range": "$100 - $300",
            "message": "Hola, necesito un catálogo digital con pedidos directos por WhatsApp para mi tienda."
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])

        lead = ContactLead.objects.get(email="carlos@inversionesmaracaibo.com")
        self.assertEqual(lead.status, 'NUEVO')
        self.assertFalse(lead.is_spam)

    def test_honeypot_spam_detection(self):
        payload = {
            "full_name": "Spam Bot",
            "business_name": "Fake Corp",
            "email": "bot@spam.com",
            "phone": "+1 800 555 0199",
            "service_interest": "WEB",
            "message": "Buy cheap watches at malicious-url.com right now!",
            "honey_trap": "I am a malicious bot filling invisible fields"
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        lead = ContactLead.objects.get(email="bot@spam.com")
        self.assertTrue(lead.is_spam)
        self.assertEqual(lead.status, 'SPAM')

    def test_invalid_short_phone_validation(self):
        payload = {
            "full_name": "Juan Perez",
            "email": "juan@gmail.com",
            "phone": "123",  # Too short
            "service_interest": "WEB",
            "message": "Mensaje de prueba corto"
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('phone', response.data)
