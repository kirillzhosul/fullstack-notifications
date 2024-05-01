"""
Notification view sets
"""

from rest_framework import viewsets  # type: ignore
from rest_framework.permissions import (  # type: ignore
    BasePermission,
    IsAdminUser,
    IsAuthenticated,
)
from rest_framework.response import Response  # type: ignore
from rest_framework.views import APIView  # type: ignore
from rest_framework.viewsets import mixins  # type: ignore

from notifications.serializers import NotificationSerializer
from notifications.services.notification import (
    get_notifications_stats,
    queryset_for_user_notifications,
)

type PC = list[type[BasePermission]]


class NotificationViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """View sets for notifications"""

    serializer_class = NotificationSerializer

    def get_queryset(self):  # type: ignore
        return queryset_for_user_notifications(self.request.user)

    def get_permissions(self) -> PC:
        self.permission_classes = (
            [IsAuthenticated] if self.request.method == "GET" else [IsAdminUser]
        )
        return super(NotificationViewSet, self).get_permissions()  # type: ignore


class NotificationStatsView(APIView):
    serializer_class = NotificationSerializer

    def get(self, *args, **kwargs):  # type: ignore
        return Response(get_notifications_stats(self.request.user))
