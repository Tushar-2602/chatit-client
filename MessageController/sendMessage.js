import { Chatty } from "../Core/src.js";
import {  LibError, LibReturn } from "../Utils/error.js";
import { randomUUID } from "crypto";

Chatty.prototype.sendDirectMessage = async function (userId,payload) {
    const messageId = randomUUID();
try {
    if (!userId || !payload) {
      throw "userId or payload not provided";
    }
    const ws = this.config.ws;
    ws.send(
      JSON.stringify({
        msgType: "direct",
        destinationUserId:userId,
        payload,
        messageId

      })
    );

    return new LibReturn({messageId});
} catch (error) {
    // emitError(this,error,messageId);

    throw new LibError(error,1000,{messageId});
} 
};

Chatty.prototype.sendGroupMessage = async function (groupId,payload) {
  const messageId = randomUUID();
try {
  if (!groupId || !payload) {
      throw "groupId or payload not provided";
    }
    const ws = this.config.ws;
    ws.send(
      JSON.stringify({
        msgType: "group",
        groupId,
        payload,
        messageId
        

      })
    );

    return new LibReturn({messageId});
} catch (error) {
    // emitError(this,error,messageId);
    throw new LibError(error,1000,{messageId});
  
} 
};

Chatty.prototype.sendSystemMessage = async function (payload) {
  const messageId = randomUUID();
try {
  if (!payload) {
      throw "payload not provided";
     // throw new LibError()
    }
    const ws = this.config.ws;
    ws.send(
      JSON.stringify({
        msgType: "system",
        subType: "custom",
        payload

      })
    );
    return new LibReturn({messageId});
    
} catch (error) {
    // emitError(this,error,messageId);
    throw new LibError(error,1000,{messageId});
    
} 
};