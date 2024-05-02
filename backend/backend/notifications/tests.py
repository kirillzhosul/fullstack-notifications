from django.test import TestCase

from notifications.models import Notification


class ModelsTestsCase(TestCase):
    def setUp(self):
        Notification.objects.create(type="INFO", target=None)

    def test_get(self):
        """Notification is created and queriable"""
        notification = Notification.objects.get(type="INFO")
        self.assertIsInstance(notification, Notification)
