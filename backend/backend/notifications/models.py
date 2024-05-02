from django.db import models

NOTIFICATION_TYPES = [
    ("INFO", "INFO"),
    ("ERROR", "ERROR"),
    ("WARN", "WARN"),
]


class Notification(models.Model):
    """
    Notification model
    TODO: time created is not taken
    TODO: `type` is actually `level` (cuz there is too small amount of types and it is actually level)
    """

    type_ = models.CharField(
        max_length=5,
        name="type",
        choices=NOTIFICATION_TYPES,
    )
    target = models.ForeignKey(to="auth.User", null=True, on_delete=models.CASCADE)  # type: ignore
