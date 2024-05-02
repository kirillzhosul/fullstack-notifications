import logging
from typing import Any

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer  # type: ignore

from invalidation.consts import (
    BROADCAST_GROUP_NAME,
    INVALIDATE_TRIGGER,
    RECEIVED_TRIGGER,
)
from invalidation.emitter import _get_configured_channel_layer  # type: ignore

logger = logging.getLogger(__name__)


class InvalidationReactiveConsumer(WebsocketConsumer):
    """
    Websocket consumer that handles groups with Redis and notifies about invalidation

    TODO: Async native
    """

    group_name: str | None = None

    def connect(self):
        """
        Connection requested, setup user && groups && layer
        """
        self.channel_layer = _get_configured_channel_layer(self.channel_layer)
        self.user_id = self._get_authorized_user_id()

        self._add_groups()

        self.accept()  # type: ignore

    def receive(self, text_data=None, bytes_data=None) -> None:  # type: ignore
        """
        Client sent something to us, nothing to do
        """
        self.send(RECEIVED_TRIGGER)  # type: ignore

    def disconnect(self, code: Any) -> None:
        """
        Client disconnect, nothing to do
        """
        self._discard_groups()

    # Events

    def events_invalidated(self, _) -> None:
        """
        Emited when we should say the client to invalidate their context
        """

        # TODO: Context is not applied (`INVALIDATION_CONTEXT`)

        self.send(INVALIDATE_TRIGGER)  # type: ignore

    # Internals

    def _get_authorized_user_id(self) -> int | None:
        """
        Returns ID of authorized user
        TODO: Actual auth is not taken here
        """
        user = self.scope["user"]  # type: ignore
        if user.is_anonymous:  # type: ignore
            return
        return int(user.pk)  # type: ignore

    def _group_add(self, group_name: str) -> None:
        wrapped_add = async_to_sync(self.channel_layer.group_add)  # type: ignore
        wrapped_add(group_name, self.channel_name)  # type: ignore

    def _group_discard(self, group_name: str) -> None:
        wrapped_discard = async_to_sync(self.channel_layer.group_discard)  # type: ignore
        wrapped_discard(group_name, self.channel_name)  # type: ignore

    def _get_groups(self) -> list[str]:
        return [BROADCAST_GROUP_NAME] + [str(self.user_id)] if self.user_id else []

    def _add_groups(self) -> None:
        [self._group_add(group) for group in self._get_groups()]

    def _discard_groups(self) -> None:
        [self._group_discard(group) for group in self._get_groups()]


invalidation_reactive_consumer_asgi: Any = InvalidationReactiveConsumer.as_asgi()  # type: ignore
