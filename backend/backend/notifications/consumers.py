import logging
from typing import Any

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer  # type: ignore
from channels.layers import get_channel_layer  # type: ignore
from channels_redis.pubsub import RedisPubSubChannelLayer  # type: ignore

logger = logging.getLogger(__name__)


class NotificationReactiveConsumer(WebsocketConsumer):
    channel_layer: RedisPubSubChannelLayer
    group_name: str | None = None

    def connect(self):
        assert isinstance(
            self.channel_layer,
            RedisPubSubChannelLayer,
        ), f"{self.channel_layer} is not an redis channel!"
        print("Connection to reactive consumer")

        user = self.scope["user"]  # type: ignore
        if user.is_anonymous:  # type: ignore
            self.user_id = None
        else:
            self.user_id = int(user.pk)  # type: ignore

        self._add_groups()
        self.accept()  # type: ignore

    def receive(self, text_data=None, bytes_data=None):  # type: ignore
        self.send("received")  # type: ignore

    def disconnect(self, code: Any) -> None:
        self._discard_groups()
        print(f"Disconnect from reactive consumer {code}")

    def _add_groups(self) -> None:
        if self.user_id:
            async_to_sync(self.channel_layer.group_add)(
                str(self.user_id),
                self.channel_name,  # type: ignore
            )
        async_to_sync(self.channel_layer.group_add)(
            "broadcast",
            self.channel_name,  # type: ignore
        )

    def _discard_groups(self) -> None:
        if self.user_id:
            async_to_sync(
                self.channel_layer.group_discard(str(self.user_id), self.channel_name)  # type: ignore
            )
        async_to_sync(
            self.channel_layer.group_discard("broadcast", self.channel_name)  # type: ignore
        )

    def events_invalidated(self, _):
        self.send("invalidated")  # type: ignore


def invalidate_notifications(target_user_id: int | None):
    print(f"invalidating for {target_user_id}")
    if target_user_id is not None and not isinstance(target_user_id, int):  # type: ignore
        raise TypeError

    channel_layer = get_channel_layer()  # type: ignore

    groups: list[str] = [str(target_user_id)] if target_user_id else ["broadcast"]
    for group in groups:
        print(group)
        async_to_sync(channel_layer.group_send)(  # type: ignore
            group, {"type": "events.invalidated", "content": ""}
        )
