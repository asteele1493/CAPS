const { EVENT_NAMES } = require('../utils');

const {
  toTest: { deliver, handlePickup },
} = require('./index');

jest.useFakeTimers();

test('Driver deliver', () => {
  //Arrange
  const events = io('ws://localhost:3123');

  const emitMock = jest.spyOn(events, 'emit');

  //Act
  deliver('1234');

  //Assert
  expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, '1234');
});

test('Driver handlePickup', () => {
  const events = io('ws://localhost:3123');

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