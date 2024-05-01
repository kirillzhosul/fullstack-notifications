from django.contrib.auth import get_user_model
from rest_framework import (  # type: ignore
    serializers,
)

from notifications.models import Notification

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ("type", "target")


User = get_user_model()
