"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import re_path
from rest_framework.routers import DefaultRouter  # type: ignore

from notifications.views import NotificationStatsView, NotificationViewSet

from . import consumers

router = DefaultRouter()
router.register(r"", NotificationViewSet, basename="")  # type: ignore
urlpatterns = [  # type: ignore
    *router.urls,  # type: ignore
    re_path(r"^stats/", NotificationStatsView.as_view()),  # type: ignore
]


websocket_urlpatterns = [
    re_path("", consumers.NotificationReactiveConsumer.as_asgi()),  # type: ignore
]
