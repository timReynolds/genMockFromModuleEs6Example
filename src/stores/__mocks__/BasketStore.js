const BasketStore = jest.genMockFromModule('../BasketStore');

console.log(BasketStore);

let _totalPrice = 0;

BasketStore.getTotalPrice.mockImplementation(() => _totalPrice);
BasketStore.__SetupTotalPrice = totalPrice => {_totalPrice = totalPrice};

export default BasketStore;
