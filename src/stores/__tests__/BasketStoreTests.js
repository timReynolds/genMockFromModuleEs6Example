jest.unmock('../BasketStore');

describe('BasketStore', function() {

  const ActionTypes = require('../../constants/AppConstants').ActionTypes;

  let sut;
  let AppDispatcher;
  let callback;

  beforeEach(function() {
    sut = require('../BasketStore').default;
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('when an item is added to the basket, should be stored in the basket', function() {
    // Arrange
    var action = {
      type: ActionTypes.ADD_PRODUCT,
      payload: {
        id: 1,
        name: 'PS4',
        price: 299.99
      }
    }
    // Act
    callback(action);
    // Assert
    expect(sut.get().length).toBe(1);
    expect(sut.get()[0]).toBe(action.payload);
  });

  it('when an item is removed from the basket, should be not stored in the basket', function() {
    // Arrange
    var actionAddPS4 = {
      type: ActionTypes.ADD_PRODUCT,
      payload: { id: 1, name: 'PS4', price: 299.99 }
    }

    var actionAddXbox = {
      type: ActionTypes.ADD_PRODUCT,
      payload: { id: 2, name: 'XBox', price: 249.99 }
    }

    var actionRemovePS4 = {
      type: ActionTypes.REMOVE_PRODUCT,
      payload: { id: 1 }
    }
    // Act
    callback(actionAddPS4);
    callback(actionAddXbox);
    callback(actionRemovePS4);
    // Assert
    expect(sut.get().length).toBe(1);
    expect(sut.get()[0]).toBe(actionAddXbox.payload);
  });

  it('when items are added to the store, should be able to get correct total price', function() {
    // Arrange
    var actionAddPS4 = {
      type: ActionTypes.ADD_PRODUCT,
      payload: { id: 1, name: 'PS4', price: 299.99 }
    }

    var actionAddXbox = {
      type: ActionTypes.ADD_PRODUCT,
      payload: { id: 2, name: 'XBox', price: 249.99 }
    }

    // Act
    callback(actionAddPS4);
    callback(actionAddXbox);
    // Assert
    expect(sut.getTotalPrice()).toBe(549.98);
  });

});
