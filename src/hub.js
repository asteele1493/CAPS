const { Server } = require("socket.io");
const { EVENT_NAMES } = require("./utils");
const { Queue } = require('./Queue');

const io = new Server(3123);

function startEventServer() {
  io.on("connection", (socket) => {
    console.log("Have new connection!", socket.id);


    //queue for waiting drivers?
    const driverQueue = new Queue;

    socket.on('driver-ready', (socket) => {
      driverQueue.enqueue(socket);
    });

        //queue for waiting packages?

    const packageQueue = new Queue;

    socket.on('package-ready', (socket) => {
      packageQueue.enqueue(socket);
    });

    //Busy work-- when the hub gets a pickup or delivered event, send to everyone.
    socket.on(EVENT_NAMES.delivered, (delivered) => {
      console.log("HUB delivered", delivered);
      io.emit(EVENT_NAMES.delivered, delivered);
    });

    socket.on(EVENT_NAMES.pickup, (pickup) => {
      console.log("HUB pickup", pickup.orderId);
      io.emit(EVENT_NAMES.pickup, pickup);
    });

    //second queue: packages to be delivered when there are no drivers. Should this be in the vendor index?
    socket.on('package_ready', (socket) => {
      console.log('Waiting on drivers!');
      waitingPackage.enqueue(socket);
    });
  });
  console.log("Everything is started");
}

startEventServer();


// Each package must be handled by one driver

