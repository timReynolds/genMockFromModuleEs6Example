import AppDispatcher from '../dispatcher/ChatAppDispatcher';
import { ActionTypes } from '../constants/ChatConstants';

export function AddProduct(id, name, price) {
  AppDispatcher.dispatch({
      type: ActionTypes.ADD_PRODUCT,
      payload: {
        id: id,
        name: name,
        price: price
      }
    });
}

export function RemoveProduct(id) {
  AppDispatcher.dispatch({
      type: ActionTypes.REMOVE_PRODUCT,
      payload: {
        id: id
      }
    });
}
