import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = "Creates default superuser for EZ Techlabs admin panel if not present."

    def handle(self, *args, **options):
        User = get_user_model()
        username = os.getenv('ADMIN_DEFAULT_USER', 'admin')
        email = os.getenv('ADMIN_DEFAULT_EMAIL', 'admin@eztechlabs.com')
        password = os.getenv('ADMIN_DEFAULT_PASSWORD', 'Ingeniero01*')

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f"✓ Superusuario '{username}' creado exitosamente con credenciales de desarrollo."))
        else:
            self.stdout.write(f"Superusuario '{username}' ya existe.")

