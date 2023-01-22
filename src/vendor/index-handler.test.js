const { EVENT_NAMES } = require('../utils');

const { sendPickup, deliveryResponse, events } = require('./index');

jest.useFakeTimers();

describe('Tests for vendors', () => {
  test('Pickup for Vendor', () => {
    //arrange
    const emitMock = jest.spyOn(events, 'emit');

    //act
    sendPickup();

    //assert
    expect(emitMock).toHaveBeenCalledWith( EVENT_NAMES.pickup, expect.objectContaining({
      store: expect.stringContaining(''),
      orderId: expect.stringMatching(
        /[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/i
      ),

    })
    );
  });
  test('Test for vendor delivery response', () => {
    //arrange
    const consoleMock = jest.spyOn(console, 'log');

    //act
    deliveryResponse('1234');

    //assert
    expect(consoleMock).toHaveBeenCalledWith(
      'Thank you for the delivery!',
      '1234'
    );
  });
});