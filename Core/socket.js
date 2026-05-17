import { connectionCloseHandler, connectionHandler } from "../ConnectionController/connectionController.js";
import { messageRecieveHandler } from "../MessageController/recieveMessage.js";
import { emitError } from "../Utils/error.js";
import { Chatty } from "./src.js";

Chatty.prototype.connect = async function (options = {}) {
  try {
    if (options.url) {
      this.config.connectionUrl = options.url;
    }
  
    if (options.token) {
      this.config.token = options.token;
    }
  
    if (options.userId) {
      this.config.userId = options.userId;
    }
  
    // Dynamically import ws package
    const { WebSocket } = await import("ws");
  
    const url = new URL(this.config.connectionUrl);

if (this.config.userId) {
  url.searchParams.set("userId", this.config.userId);
}

if (this.config.token) {
  url.searchParams.set("token", this.config.token);
}

// Create websocket connection
const socket = new WebSocket(url.toString());
  
    // Save connection
    this.config.ws = socket;
  
    // Events
    socket.on("open", (event) => {
      // handle connection
      connectionHandler(this,socket)
    });
  
  socket.on("message", (data) => {
     //message handler
     messageRecieveHandler(this,data);
  });
  
    socket.on("close", (code, reason) => {
      // handle close 
      connectionCloseHandler(this,socket,code,reason);

    });
  
    socket.on("error", (err) => {
      // handle error
      emitError(this,err)
      connectionCloseHandler(this,socket,1004,"closed after error");
    });
  
    return socket;
  } catch (error) {
    emitError(this,error)
    throw error;
  }
};

Chatty.prototype.disconnect = async function (code = 1000, reason = "Disconnected") {
  try {
    const socket = this.config.ws;

    if (!socket) {
      this.emit("error", new Error("WebSocket not connected"));
      return;
    }

    socket.close(code, reason);

    this.config.ws = null;

    this.emit("disconnect");
  } catch (error) {
    emitError(this, error);
    throw error;
  }
};