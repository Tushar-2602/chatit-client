export class LibError extends Error {
  constructor(err, code = 1000, data = {}) {
    if (err instanceof LibError) {
      return err;
    }

    if (err instanceof Error) {
      super(err.message, { cause: err });
    } else {
      super(String(err));
    }

    this.success = false;
    this.code = code;
    this.data = data;
  }
}

export class LibReturn {
   constructor(data = {},code = 201) {
   this.success = true;
    this.code = code;
    this.data = data;
   }

}
export const emitErrorMessage = (instance, err,messageId,code) => {
   // const error = err instanceof Error ? err : new Error(err);

    if (instance.listenerCount("errorMessage") > 0) {
        instance.emit("errorMessage", {
            error:err,
            messageId,
            code
        });
    } else {
        console.error("errorMessageLog "+
            error
        );
        console.log("messageId " + 
            messageId);
        console.log("code " + 
           code);
    }
};
