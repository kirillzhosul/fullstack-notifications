from typing import Any

from django.urls import path

from .consumers import invalidation_reactive_consumer_asgi

urlpatterns: list[Any] = [path("", invalidation_reactive_consumer_asgi)]  # type: ignore
