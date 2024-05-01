from rest_framework import serializers  # type: ignore

from notifications.models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ("type", "target")
