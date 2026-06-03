import {  emitErrorMessage, LibError } from "../Utils/error.js";

export const messageRecieveHandler = function (instance, rawData) {
  try {
    // ws buffer/string -> json
    const data = JSON.parse(rawData.toString());

    const { msgType, subType } = data;

    if (!msgType) {
      throw new LibError("msgType missing",1001);
      return;
    }

    switch (msgType) {
      case "direct": {
        instance.emit("directMessage", data);
         handleAck(instance, data);
        break;
      }

      case "group": {
        instance.emit("groupMessage", data);
         if (data.fromUserId != instance.config.userId) {
          handleAck(instance, data);
         }
        break;
      }

      case "system": {
        //instance.emit("system", data);

        switch (subType) {
          case "ackSent": {
            instance.emit("ackSent", data);
            //handleAckSent(instance, data);
            break;
          }

          case "ackDelivered": {
            instance.emit("ackDelivered", data);
            //handleAckDelivered(instance, data);
            break;
          }

          case "error": {
            emitErrorMessage(instance,data.payload,data.messageId,data.code);
            //handleAckDelivered(instance, data);
            break;
          }

          case "messageResponseWithSequenceNumber": {
            // instance.emit(
            //   "messageResponseWithSequenceNumber",
            //   data
            // );

             handleMessageResponseWithSequenceNumber(
              instance,
              data
            );

            break;
          }
          case "custom": {
            instance.emit("systemMessage", data);
            break;
          }

          case "pong": {
            instance.config.isAlive = true;
            break;
          }

          case "userId": {
            instance.config.userId = data.userId;
            break;
          }

          default: {
            instance.emit("unknownSystemMessage", data);
          }
        }

        break;
      }

      default: {
        instance.emit("unknownMessageType", data);
      }
    }
  } catch (error) {
    throw error

  }
};

/* ---------------- Placeholder Handlers ---------------- */


function handleMessageResponseWithSequenceNumber(
  instance,
  data
) {}

export const handleAck = (instance,data)=>{
const {messageId,sequenceNumber} = data;
if (messageId) {
  
  const ws = instance.config?.ws;
  ws.send(
    JSON.stringify({
      msgType: "system",
      subType: "ack",
      messageId,
      ...(sequenceNumber && {sequenceNumber})
    })
  );
  // console.log("ack sent "+sequenceNumber);
}
}