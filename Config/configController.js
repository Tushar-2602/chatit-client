import { Chatty } from "../Core/src.js";
import { emitError } from "../Utils/error.js";

Chatty.prototype.changeConfig = async function(options={}) {
  try {
      if (options.url) {
          this.config.connectionUrl=options.url;
      }
      if (options.token) {
          this.config.connectionUrl=options.token;
      }
      if (options.userId) {
          this.config.connectionUrl=options.userId;
      }
  } catch (error) {
    emitError(this,error);
    throw error;
  }
}