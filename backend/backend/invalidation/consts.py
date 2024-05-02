"""
TODO: Enums
"""

from typing import Literal, TypeAlias

from channels_redis.pubsub import (  # type: ignore
    RedisPubSubChannelLayer,  # type: ignore
)

# Groups
BROADCAST_GROUP_NAME = "broadcast"

# Consumer
INVALIDATION_CONTEXT: TypeAlias = Literal["NOTIFICATION"] | Literal["UNSET"]
CONSUMER_EVENT_TYPES: TypeAlias = Literal["events.invalidated"]

# Message
INVALIDATE_TRIGGER = "invalidated"
RECEIVED_TRIGGER = "received"

# Configuration
EXPECTED_LAYER_TYPE = RedisPubSubChannelLayer
