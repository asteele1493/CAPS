const { events, EVENT_NAMES } = require('../events');
const {
  toTest: { deliver, handlePickup },
} = require('./index');

jest.useFakeTimers();

test('Driver deliver', () => {
  //Arrange
  const emitMock = jest.spyOn(events, 'emit');

  //Act
  deliver('1234');

  //Assert
  expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, '1234');
});

test('Driver handlePickup', () => {
  //Arrange
  const emitMock = jest.spyOn(events, 'emit');

  //Act
  handlePickup({
    store: 'test',
    orderId: '1234',
    customer: 'customer',
    address: '123 Main',
  });

  //Timers - skip setTimeout
  jest.runAllTimers();

  //Assert
  expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, '1234');
});