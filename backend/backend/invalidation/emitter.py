from logging import getLogger
from typing import Any

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer  # type: ignore

from invalidation.consts import (
    BROADCAST_GROUP_NAME,
    CONSUMER_EVENT_TYPES,
    EXPECTED_LAYER_TYPE,
    INVALIDATION_CONTEXT,
)

logger = getLogger(__name__)


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
