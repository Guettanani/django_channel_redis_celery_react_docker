const WebSocketManager = {
  socket: null,

  connect: function(url, onMessageCallback, onCloseCallback) {
      this.socket = new WebSocket(url);
      this.socket.onmessage = onMessageCallback;
      this.socket.onclose = onCloseCallback;
  },

  close: function() {
      if (this.socket) {
          this.socket.close();
      }
  }
};

export default WebSocketManager;
