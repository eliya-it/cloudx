const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
const initialState = {
  orders: null,
};
const updateSuccess = (state, action) => {
  return updateObject(state, {
    orders: null || action.orders,
  });
};
const reducer = (state = initialState, action) => {
  return updateSuccess(state, action);
};
export default reducer;
