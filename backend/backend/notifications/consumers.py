import logging
from typing import Any

from channels.generic.websocket import WebsocketConsumer  # type: ignore

logger = logging.getLogger(__name__)


class NotificationReactiveConsumer(WebsocketConsumer):
    def connect(self):
        logger.info("Connection to reactive consumer")
        self.accept()  # type: ignore

    def receive(self, text_data=None, bytes_data=None):  # type: ignore
        self.send("received")  # type: ignore

    def disconnect(self, code: Any) -> None:
        logger.info(f"Disconnect from reactive consumer {code}")
