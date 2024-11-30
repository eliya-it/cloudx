import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: false,
  userId: false,
  error: false,
  loading: false,
  role: null,
  photo: false,
  name: false,
  isAuth: false,
};
const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const logoutStart = (state, action) => {
  return initialState;
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,

    isTwoFa: action.isTwoFa,
    error: null,
    loading: false,
    curIndex: action.curIndex,
    accessToken: action.accessToken,
    status: action.status,
    userId: null || action.userId,
    name: null || action.name,
    photo: null || action.photo,
    role: action.role,
    isAuth: true,
  });
};
const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.LOGOUT:
      return logoutStart(state, action);
    default:
      return state;
  }
};

export default reducer;
