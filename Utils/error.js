export const emitError = (instance, err, messageId) => {
    const error = err instanceof Error ? err : new Error(err);

    if (instance.listenerCount("error") > 0) {
        instance.emit("error", {
            error,
            ...(messageId && {messageId})
        });
    } else {
        console.error("errorLog "+
            error
        );
        console.log("messageId " + 
            messageId);
        
    }
};
export const emitErrorMessage = (instance, err,messageId,code) => {
    const error = err instanceof Error ? err : new Error(err);

    if (instance.listenerCount("errorMessage") > 0) {
        instance.emit("errorMessage", {
            error,
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
