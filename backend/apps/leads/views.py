import os
import logging
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from .models import ContactLead
from .serializers import ContactLeadSerializer

logger = logging.getLogger(__name__)

class ContactSubmissionThrottle(AnonRateThrottle):
    rate = '5/minute'

class ContactLeadCreateView(generics.CreateAPIView):
    """
    Public endpoint for contact submissions with rate-limiting,
    honeypot anti-spam, automated data persistence, and optional email dispatch.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactLeadSerializer
    throttle_classes = [ContactSubmissionThrottle]

    def perform_create(self, serializer):
        lead = serializer.save()

        # Send email notification if not marked as spam
        if not lead.is_spam:
            try:
                recipient = os.getenv('CONTACT_EMAIL', 'zambranoeli2010@gmail.com')
                subject = f"🚀 Nueva Solicitud de Proyecto - EZ Techlabs: {lead.full_name}"
                body = f"""Has recibido una nueva propuesta de trabajo a través del sitio web de EZ Techlabs:

• Nombre del cliente: {lead.full_name}
• Empresa o Negocio: {lead.business_name or 'No especificado'}
• Teléfono / WhatsApp: {lead.phone}
• Correo electrónico: {lead.email}
• Servicio de interés: {lead.get_service_interest_display()}
• Alcance del proyecto: {lead.budget_range}

Mensaje del cliente:
------------------------------------------------------------
{lead.message}
------------------------------------------------------------

Gestiona este contacto directamente en tu panel administrativo:
https://ez-techlabs-backend.onrender.com/gestor-ez/leads/contactlead/{lead.id}/change/
"""
                send_mail(
                    subject=subject,
                    message=body,
                    from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'EZ Techlabs <noreply@eztechlabs.com>'),
                    recipient_list=[recipient],
                    fail_silently=True,
                )
            except Exception as e:
                logger.warning(f"Email dispatch error: {e}")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "success": True,
                "message": "¡Mensaje recibido con éxito! El equipo de EZ Techlabs se pondrá en contacto contigo en breve.",
                "data": {
                    "id": serializer.data['id'],
                    "full_name": serializer.data['full_name']
                }
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )

