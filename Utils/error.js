export const emitError = (instance, err) => {
    const error = err instanceof Error ? err : new Error(err);

    if (instance.listenerCount("error") > 0) {
        instance.emit("error", error);
    } else {
        console.error("errorLog "+error);
    }
};
export const emitErrorMessage = (instance, err) => {
    const error = err instanceof Error ? err : new Error(err);

    if (instance.listenerCount("errorMessage") > 0) {
        instance.emit("errorMessage", error);
    } else {
        console.error("errorMessageLog "+error);
    }
};
