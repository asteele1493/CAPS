const { EVENT_NAMES, chance } = require('../utils');

const { io } = require("socket.io-client");
const events = io("ws://localhost:3123"); 

//GOAL: Each package must be handled by one driver


//The driver will be queued up waiting for packages. socket.emit()? Initializes queue. 

//The driver will need to emit a message saying they are ready. This will trigger the dequeue event?
  //socket.broadcast.emit('package has been picked up', socket)? Needs to correspond to driver id?

//Driver will need to send 'delivered' message, emit - DRIVER
   //first queue
 
  

function deliver(orderId){
  console.log('Driver has now finished delivery', orderId);
  events.emit(EVENT_NAMES.delivered, orderId);
}

function handlePickup(event) {
  console.log ('Driver received a pickup event!', event.orderId);
  setTimeout(() => deliver(event.orderId), chance.integer({min:500, max: 1000}));
}

function startDriver() {
  console.log("Driver is ready!");

  events.on(EVENT_NAMES.pickup, handlePickup);
}

module.exports = {
  toTest: {
    deliver,
    handlePickup,
  },
};

startDriver();

