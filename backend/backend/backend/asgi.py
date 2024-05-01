"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack  # type: ignore
from channels.routing import ProtocolTypeRouter, URLRouter  # type: ignore
from django.core.asgi import get_asgi_application

import notifications.urls

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

asgi_application = get_asgi_application()


application = ProtocolTypeRouter(
    {
        "http": asgi_application,
        "websocket": AuthMiddlewareStack(
            URLRouter(notifications.urls.websocket_urlpatterns)
        ),
    }
)
