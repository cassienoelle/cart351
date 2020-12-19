import { useState } from "react";

export function useWebsocket({ url, onOpen, onError, onClose, onMessage }) {
  const [websocket] = useState(new WebSocket(url));

  if (onOpen) {
    websocket.onopen = onOpen;
  }

  if (onError) {
    websocket.onerror = onError;
  }

  if (onMessage) {
    websocket.onmessage = onMessage;
  }

  if (onClose) {
    websocket.onclose = onClose;
  }

  return {
    websocket,
  };
}
