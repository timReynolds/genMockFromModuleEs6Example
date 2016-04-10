import R from 'ramda';
import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes, StoreTypes } from '../constants/AppConstants';

const basketTotal = R.compose(R.sum, R.pluck('price'));
let _products = [];

const BasketStore = R.merge(EventEmitter.prototype, {
  emitChange: () => {
    BasketStore.emit(StoreTypes.BASKET_CHANGE);
  },
  addChangeListener: (callback) => {
    BasketStore.on(StoreTypes.BASKET_CHANGE, callback);
  },
  removeChangeListener: (callback) => {
    BasketStore.removeListener(StoreTypes.BASKET_CHANGE, callback);
  },
  get: () => {
    return _products;
  },
  getTotalPrice: () => {
    return basketTotal(_products);
  }
});

BasketStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type) {
    case ActionTypes.ADD_PRODUCT:
      const product = action.payload;
      _products = [..._products, product];
      BasketStore.emitChange();
      break;
    case ActionTypes.REMOVE_PRODUCT:
      const index = R.findIndex(R.propEq('id', action.payload.id))(_products);
      if(index === -1) {
        return;
      }
      _products = [..._products.slice(0, index), ..._products.slice(index + 1)];
      BasketStore.emitChange();
      break;
  }
});

export default BasketStore;
