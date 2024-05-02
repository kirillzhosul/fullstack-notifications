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

from invalidation.emitter import emit_invalidation
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
    """
    View sets for notifications

    TODO: Filter with created_at + `period` field (use django query filters builder)

    """

    serializer_class = NotificationSerializer

    def perform_create(self, serializer: NotificationSerializer):
        """
        Performs creation with emiitting invalidation event
        """
        emit_invalidation(
            serializer.validated_data.get("target"),  # type: ignore
            context="NOTIFICATION",
        )
        return super().perform_create(serializer)  # type: ignore

    def get_queryset(self):  # type: ignore
        """
        Builds queryset based on permissions
        """
        return queryset_for_user_notifications(self.request.user)

    def get_permissions(self) -> PC:
        """
        Modification is permitted only to admins
        """
        self.permission_classes = (
            [IsAuthenticated] if self.request.method == "GET" else [IsAdminUser]
        )
        return super(NotificationViewSet, self).get_permissions()  # type: ignore


class NotificationStatsView(APIView):
    serializer_class = NotificationSerializer

    def get(self, *args, **kwargs):  # type: ignore
        return Response(get_notifications_stats(self.request.user))
