import * as actionTypes from "./actionTypes";
export const orderSuccess = (orders) => {
  return {
    type: actionTypes.SET_ORDERS,
    orders,
  };
};
export const setOrders = (orders) => {
  return (dispatch) => {
    dispatch(orderSuccess(orders));
  };
};
