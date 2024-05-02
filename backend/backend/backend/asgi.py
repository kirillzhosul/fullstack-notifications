import os

from channels.auth import AuthMiddlewareStack  # type: ignore
from channels.routing import ProtocolTypeRouter, URLRouter  # type: ignore
from django.core.asgi import get_asgi_application

import invalidation.urls

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

asgi_app = get_asgi_application()
ws_app = AuthMiddlewareStack(URLRouter(invalidation.urls.urlpatterns))
application = ProtocolTypeRouter({"http": asgi_app, "websocket": ws_app})
