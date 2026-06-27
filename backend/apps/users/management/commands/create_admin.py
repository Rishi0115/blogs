import os
from pathlib import Path

from django.core.management.base import BaseCommand
from dotenv import load_dotenv

from apps.users.models import User

# Explicitly load the .env file from the backend root
ENV_PATH = Path(__file__).resolve().parents[4] / ".env"


class Command(BaseCommand):
    help = "Create an admin user using ADMIN_EMAIL and ADMIN_PASSWORD from .env"

    def handle(self, *args, **kwargs):
        load_dotenv(dotenv_path=ENV_PATH)

        email = os.getenv("ADMIN_EMAIL")
        password = os.getenv("ADMIN_PASSWORD")

        if not email or not password:
            self.stdout.write(
                self.style.ERROR(
                    f"ADMIN_EMAIL and ADMIN_PASSWORD must be set in {ENV_PATH}"
                )
            )
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.WARNING("Admin already exists"))
            return

        User.objects.create_superuser(
            email=email,
            username=email.split("@")[0],
            password=password,
        )

        self.stdout.write(self.style.SUCCESS("Admin created successfully"))
