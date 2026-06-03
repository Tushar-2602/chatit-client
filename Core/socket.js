import { connectionCloseHandler, connectionHandler } from "../ConnectionController/connectionController.js";
import { messageRecieveHandler } from "../MessageController/recieveMessage.js";
import {  LibError, LibReturn } from "../Utils/error.js";
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
    let WebSocket;
    try {
       ({ WebSocket } = await import("ws"));
    } catch (error) {
      
    }
  
    const url = new URL(this.config.connectionUrl);

if (this.config.userId) {
  url.searchParams.set("userId", this.config.userId);
}

if (this.config.token) {
  url.searchParams.set("token", this.config.token);
}

// Create websocket connection
let socket;
try {
  socket = new WebSocket(url.toString());
} catch (error) {
  throw new LibError("if you are not running on browser then install websocket package, for node js run: npm install ws ",1010,{});
}
  
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
      // emitError(this,err)
      connectionCloseHandler(this,socket,1004,"closed after error");
      throw err;
    });
  return new LibReturn({socket});
    

  } catch (error) {
    throw new LibError(error);
  }
};

Chatty.prototype.disconnect = async function (code = 1000, reason = "Disconnected") {
  try {
    const socket = this.config.ws;

    if (!socket) {
     throw new LibError("WebSocket not connected",1002);
    }

    socket.close(code, reason);

    this.config.ws = null;

    this.emit("disconnect");
    return new LibReturn();
  } catch (error) {
    
    throw new LibError(error);
  }
};