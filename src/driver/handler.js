const { events, chance } = require('../events');

function deliver(orderId){
  console.log('Driver has now finished delivery');
  events.emit('delivered', orderId);
}

function handlePickup(event) {
  console.log ('Driver received a pickup event!', event.orderId);
  setTimeout(() => deliver(event.orderId), chance.integer({min:500, max: 1000}));
}

function startDriver() {
  console.log("Driver is ready!");

  events.on('pickup', handlePickup);
}

module.exports = { startDriver }