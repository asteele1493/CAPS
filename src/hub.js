// const { startDriver } = require("./driver/handler");
// const { startVendor } = require("./vendor/handler");
const { Server } = require('socket.io');

const io = new Server(3333);
// startDriver();
// startVendor();

function startEventServer(){
  io.on('connection', () => {
    console.log('Have new connection!');
  })
  console.log("Everything is started");

}

startEventServer(); 

