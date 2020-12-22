var socket = new WebSocket("ws://localhost:8080/ws");

let connect = (cb: (msg: MessageEvent<any>) => void) => {
  console.log("connecting");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onmessage = (msg) => {
    cb(msg);
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
};

function sendMsg(msg: string) {
  socket.send(msg);
}

export { connect, sendMsg };
