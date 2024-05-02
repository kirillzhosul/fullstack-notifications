"""
Notification view sets
"""

from typing import Any

from rest_framework import viewsets  # type: ignore
from rest_framework.permissions import (  # type: ignore
    BasePermission,
    IsAdminUser,
    IsAuthenticated,
)
from rest_framework.response import Response  # type: ignore
from rest_framework.views import APIView  # type: ignore
from rest_framework.viewsets import mixins  # type: ignore

from invalidation.emitter import emit_invalidation
from notifications.serializers import NotificationSerializer
from notifications.services.notification import (
    get_notifications_stats,
    queryset_for_user_notifications,
)


class NotificationViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """
    View sets for notifications

    TODO: Filter with created_at + `period` field (use django query filters builder)
    """

    serializer_class = NotificationSerializer

    def perform_create(self, serializer: NotificationSerializer):
        """
        Performs creation with emiitting invalidation event
        """
        invalidate(serializer.validated_data.get("target"))  # type: ignore
        return super().perform_create(serializer)  # type: ignore

    def get_queryset(self):  # type: ignore
        return queryset_for_user_notifications(self.request.user)

    def get_permissions(self) -> list[type[BasePermission]]:
        self.permission_classes = _dissalow_modification_classes(self.request.method)
        return super(NotificationViewSet, self).get_permissions()  # type: ignore


class NotificationStatsView(APIView):
    """
    View for stats over notifications

    Authentication is injected inside services
    """

    serializer_class = NotificationSerializer

    def get(self, *args: Any, **kwargs: Any) -> Response:
        return Response(get_notifications_stats(self.request.user))


def _dissalow_modification_classes(method: Any) -> list[type[BasePermission]]:
    """
    Allow modification only to admins
    """
    return [IsAuthenticated] if method in ("GET", "HEAD") else [IsAdminUser]


def invalidate(context_user: int | None) -> None:
    """
    Causes notification invalidation on create / any
    """
    emit_invalidation(context_user, context="NOTIFICATION")
