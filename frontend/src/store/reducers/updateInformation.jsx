const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
const initialState = {
  photo: null,
  name: null,
};
const updateSuccess = (state, action) => {
  return updateObject(state, {
    name: null || action.name,
    photo: null || action.photo,
  });
};
const reducer = (state = initialState, action) => {
  return updateSuccess(state, action);
};
export default reducer;
