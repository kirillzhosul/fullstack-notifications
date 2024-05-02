from django.contrib.auth.models import AbstractBaseUser, AnonymousUser
from django.db.models import Count, Q

from notifications.models import Notification

type U = AbstractBaseUser | AnonymousUser


def queryset_for_user_notifications(user: U):
    """
    Returns query for obtaining notification of the user
    Will return all notifications for admins and only targetted for default user
    """
    # Notifications for all (as admin)
    if user.is_staff:  # type: ignore
        return Notification.objects.all()

    # Notifications for user
    return Notification.objects.filter(Q(target=user.id) | Q(target=None))  # type: ignore


def get_notifications_stats(user: U) -> dict[str, int]:
    """
    Returns notifications stats as a dict from default query set

    Roughly equals to
    SELECT type, COUNT(*) FROM notifications

    And result as

    TYPE  | HITS
    ------------
    INFO  | 0
    ERROR | 1
    """

    q = (
        queryset_for_user_notifications(user)
        .values("type")
        .order_by("type")
        .annotate(count=Count("type"))
    )
    return {hit["type"]: hit["count"] for hit in q}
