const { chance, EVENT_NAMES } = require('../utils');

const { io } = require('socket.io-client');

const events = io('ws://localhost:3123');


function sendPickup() {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
//takes the name of the pickup event & the args we want to sent with it
  events.emit(EVENT_NAMES.pickup, event);
  console.log('Vendor is asking for a pickup!', event);
}

function acknowledgeDelivery(orderId){
  console.log('Thank you for the delivery!', orderId);
}
function startVendor() {
  events.on(EVENT_NAMES.delivered, acknowledgeDelivery);

  console.log("Vendor is ready!");
  function ready(){
    sendPickup();
//Once vendor is ready, every half a second, will send a sendPickup event
    setTimeout(startVendor, chance.integer({min: 750, max: 2000}));
  }
  ready();
}

startVendor();
