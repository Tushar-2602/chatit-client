export const connectionHandler = async (instance, ws) => {
  // mark connection alive
  instance.config.isAlive = true;

  instance.emit("connectionOpen",instance.config.connectionUrl);


  // heartbeat interval
  const interval = setInterval(() => {
    // if previous ping not acknowledged
    if (!instance.config.isAlive) {
      clearInterval(interval);
      ws.terminate();
      return;
    }

    // expect pong now
    instance.config.isAlive = false;

    ws.send(
      JSON.stringify({
        msgType: "system",
        subType: "ping"
      })
    );
  }, 30000);
  instance.config.interval = interval


};

export const connectionCloseHandler = async (instance, ws,code,reason) => {
  console.log("ran");
  
    instance.emit("connectionClose",{code,reason});
    const interval = instance.config?.interval;
    clearInterval(interval);
    instance.config = {};
};