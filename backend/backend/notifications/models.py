from django.db import models

NOTIFICATION_TYPES = [
    ("INFO", "INFO"),
    ("ERROR", "ERROR"),
    ("WARN", "WARN"),
]


class Notification(models.Model):
    type_ = models.CharField(
        max_length=5,
        name="type",
        choices=NOTIFICATION_TYPES,
    )
    target = models.ForeignKey(to="auth.User", null=True, on_delete=models.CASCADE)  # type: ignore
