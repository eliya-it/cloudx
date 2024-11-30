import * as actionTypes from "./actionTypes";
export const updateSuccess = (name, photo) => {
  return {
    type: actionTypes.UPDATE_INFORMATION,
    name,
    photo,
  };
};
export const update = (name, photo) => {
  return (dispatch) => {
    dispatch(updateSuccess(name, photo));
  };
};
