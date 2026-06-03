import { Chatty } from "../Core/src.js";
import { LibError, LibReturn } from "../Utils/error.js";

Chatty.prototype.changeConfig = async function(options={}) {
  try {
      if (options.url) {
          this.config.connectionUrl=options.url;
      }
      if (options.token) {
          this.config.token=options.token;
      }
      if (options.userId) {
          this.config.userId=options.userId;
      }
      return new LibReturn();
  } catch (error) {
    throw new LibError(error);
  }
}

Chatty.prototype.getConfig = async function(options={}) {
  try {
     // return instance.config;
      return new LibReturn({config:this.config});
  } catch (error) {
    throw new LibError(error);
    
  }
}