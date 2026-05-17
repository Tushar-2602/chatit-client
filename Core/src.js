import { EventEmitter } from "node:events";
import { randomUUID } from "node:crypto";


export class Chatty extends EventEmitter {
  constructor(options = {}) {
    super();

    // config setup

    this.config = {
      connectionUrl:options.url,
      userId:options.userId,
      token:options.token
    };

  }
}