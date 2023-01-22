const { EVENT_NAMES } = require("../utils");

const { deliver, handlePickup, events } = require("./index");

jest.useFakeTimers();

describe("Tests for driver", () => {
  test("Driver Pickup", () => {
    //Arrange

    const emitMock = jest.spyOn(events, "emit");

    //Act
    handlePickup({
      store: 'test',
      orderId: '1234',
      customer: 'test',
      address: '123 test',
    });

    jest.runAllTimers();

    //Assert
    expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
  });

  test("Driver delivery", () => {
    //Arrange
    const emitMock = jest.spyOn(events, "emit");

    //Act
  delivered('1234');

    //Timers - skip setTimeout
    jest.runAllTimers();

    //Assert
    expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
  });
});
