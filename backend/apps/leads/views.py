from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from .models import ContactLead
from .serializers import ContactLeadSerializer

class ContactSubmissionThrottle(AnonRateThrottle):
    rate = '5/minute'

class ContactLeadCreateView(generics.CreateAPIView):
    """
    Public endpoint for contact submissions with rate-limiting,
    honeypot anti-spam, and automated data persistence.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactLeadSerializer
    throttle_classes = [ContactSubmissionThrottle]

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

