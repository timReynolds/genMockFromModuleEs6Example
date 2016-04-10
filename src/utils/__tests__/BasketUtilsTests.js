jest.unmock('../BasketUtils');

import * as sut from '../BasketUtils';

describe('BasketUtils', () => {

  function __setupMockBasketStoreTotalPrice(totalPrice) {
    const BasketStore = require('../../stores/BasketStore');
    BasketStore.__SetupTotalPrice(totalPrice);
  }

  describe('basketTotalPriceVatBreakdown', () => {

    it('should return the price from the store as cost and vat', () => {
      // arrange
      __setupMockBasketStoreTotalPrice(100.00);

      // act
      const result = sut.basketTotalPriceVatBreakdown()
      // assert
      expect(result.vat).toBe(20);
      expect(result.cost).toBe(100);
    });
  });
})
