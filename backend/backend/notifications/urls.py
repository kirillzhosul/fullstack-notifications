from django.urls import re_path
from rest_framework.routers import DefaultRouter  # type: ignore

from notifications.views import NotificationStatsView, NotificationViewSet

router = DefaultRouter()
router.register(r"", NotificationViewSet, basename="")  # type: ignore
urlpatterns = [  # type: ignore
    *router.urls,  # type: ignore
    re_path(r"^stats/", NotificationStatsView.as_view()),  # type: ignore
]
