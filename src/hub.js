const { Server } = require("socket.io");
const { EVENT_NAMES } = require("./utils");

const io = new Server(3123);

function startEventServer() {
  io.on("connection", (socket) => {
    console.log("Have new connection!", socket.id);

    //Busy work-- when the hub gets a pickup or delivered event, send to everyone.
    socket.on(EVENT_NAMES.delivered, (delivered) => {
      console.log("HUB delivered", delivered);
      io.emit(EVENT_NAMES.delivered, delivered);
    });

    socket.on(EVENT_NAMES.pickup, (pickup) => {
      console.log("HUB pickup", pickup.orderId);
      io.emit(EVENT_NAMES.pickup, pickup);
    });
  });
  console.log("Everything is started");
}

startEventServer();
