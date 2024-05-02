from django.contrib.auth.models import AbstractBaseUser, AnonymousUser
from django.db.models import Count, Q
from notifications.models import Notification

type U = AbstractBaseUser | AnonymousUser


def queryset_for_user_notifications(user: U):
    """
    Returns query for obtaining notification of the user
    """
    if user.is_staff:  # type: ignore
        # Notifications for all
        return Notification.objects.all()
    # Notifications for user
    return Notification.objects.filter(Q(target=user.id) | Q(target=None))  # type: ignore


def get_notifications_stats(user: U):
    q = (
        queryset_for_user_notifications(user)
        .values("type")
        .order_by("type")
        .annotate(count=Count("type"))
    )
    return {hit["type"]: hit["count"] for hit in q}
