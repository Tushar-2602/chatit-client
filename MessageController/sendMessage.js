import { Chatty } from "../Core/src.js";
import { emitError } from "../Utils/error.js";
import { randomUUID } from "crypto";

Chatty.prototype.sendDirectMessage = async function (userId,payload) {
try {
    const ws = this.config.ws;
    const messageId = randomUUID();
    ws.send(
      JSON.stringify({
        msgType: "direct",
        destinationUserId:userId,
        payload,
        messageId

      })
    );
    return messageId;
} catch (error) {
    emitError(this,error);
    throw error;
}
};

Chatty.prototype.sendGroupMessage = async function (groupId,payload) {
try {
    const ws = this.config.ws;
    const messageId = randomUUID();
    ws.send(
      JSON.stringify({
        msgType: "group",
        groupId,
        payload,
        messageId
        

      })
    );
    return messageId;
} catch (error) {
    emitError(this,error);
    throw error;
}
};

Chatty.prototype.sendSystemMessage = async function (payload) {
try {
    const ws = this.config.ws;
    ws.send(
      JSON.stringify({
        msgType: "system",
        subType: "custom",
        payload

      })
    );
} catch (error) {
    emitError(this,error);
    throw error;
}
};