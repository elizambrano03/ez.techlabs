import html
from rest_framework import serializers
from .models import ContactLead

class ContactLeadSerializer(serializers.ModelSerializer):
    honey_trap = serializers.CharField(
        required=False,
        allow_blank=True,
        write_only=True,
        help_text="Campo honeypot anti-spam (debe quedar vacío)"
    )

    class Meta:
        model = ContactLead
        fields = [
            'id', 'full_name', 'business_name', 'email', 'phone',
            'service_interest', 'budget_range', 'message', 'honey_trap',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_full_name(self, value):
        sanitized = html.escape(value.strip())
        if len(sanitized) < 2:
            raise serializers.ValidationError("Por favor ingresa un nombre válido.")
        return sanitized

    def validate_phone(self, value):
        sanitized = value.strip()
        # Ensure it has at least digits
        digits = [c for c in sanitized if c.isdigit()]
        if len(digits) < 7:
            raise serializers.ValidationError("Por favor ingresa un número de teléfono o WhatsApp válido.")
        return sanitized

    def validate_message(self, value):
        sanitized = html.escape(value.strip())
        if len(sanitized) < 10:
            raise serializers.ValidationError("Cuéntanos un poco más sobre lo que necesitas (mínimo 10 caracteres).")
        return sanitized

    def create(self, validated_data):
        honey_trap = validated_data.pop('honey_trap', '')
        is_spam = bool(honey_trap and honey_trap.strip())

        # Extract client IP & User Agent from serializer context if available
        request = self.context.get('request')
        ip = None
        user_agent = ''
        if request:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')
            user_agent = request.META.get('HTTP_USER_AGENT', '')[:250]

        lead = ContactLead.objects.create(
            **validated_data,
            ip_address=ip,
            user_agent=user_agent,
            is_spam=is_spam,
            status='SPAM' if is_spam else 'NUEVO'
        )
        return lead

