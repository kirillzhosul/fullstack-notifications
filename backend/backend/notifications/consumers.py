import logging
from typing import Any, Literal, TypeAlias

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer  # type: ignore
from channels.layers import get_channel_layer  # type: ignore
from channels_redis.pubsub import RedisPubSubChannelLayer  # type: ignore

logger = logging.getLogger(__name__)

# Configuration
EXPECTED_LAYER_TYPE = RedisPubSubChannelLayer

# Groups
BROADCAST_GROUP_NAME = "broadcast"

# Consumer
INVALIDATION_CONTEXT: TypeAlias = Literal["NOTIFICATION"] | Literal["UNSET"]
CONSUMER_EVENT_TYPES: TypeAlias = Literal["events.invalidated"]

# Message
INVALIDATE_TRIGGER = "invalidated"
RECEIVED_TRIGGER = "received"


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


def emit_invalidation(
    user_id: int | None = None, context: INVALIDATION_CONTEXT = "UNSET"
):
    """
    Emits invalidation event that means data is not valid any more
    """

    logger.info(f"Emitting invalidation within context `{context}` for {user_id=}")
    if user_id is not None and not isinstance(user_id, int):  # type: ignore
        raise TypeError("Expected user_id to be integer or None for broadcast")

    groups = _get_groups_to_emit(str(user_id))
    _emit_to_group_list_sync(groups, "events.invalidated", context)


def _emit_to_group_list_sync(
    groups: list[str], type: CONSUMER_EVENT_TYPES, content: str
) -> None:
    """
    Emits given type + content payload within groups list
    """
    channel_layer = _get_configured_channel_layer()
    wrapped_send = async_to_sync(channel_layer.group_send)  # type: ignore
    payload = {"type": type, "content": content}

    [wrapped_send(group, payload) for group in groups]


def _get_configured_channel_layer(layer: Any = None) -> EXPECTED_LAYER_TYPE:
    """
    Wrapper for channel layer getter
    """
    return _expect_configured_channel_layer(layer if layer else get_channel_layer())


def _expect_configured_channel_layer(channel_layer: Any) -> EXPECTED_LAYER_TYPE:
    """
    Wraps channel layer into expected type
    Workaround for type system && configuration
    """
    if not isinstance(channel_layer, EXPECTED_LAYER_TYPE):
        raise Exception(
            f"Expected configured channel layer, but got {channel_layer} (Checking against {EXPECTED_LAYER_TYPE})"
        )

    return channel_layer


def _get_groups_to_emit(user_id: str | int) -> list[str]:
    """
    Returns group names to emit tag for
    """
    return [str(user_id)] if user_id else [BROADCAST_GROUP_NAME]
