import { combineReducers } from "redux";
import authReducer from "./auth";
import updateReducer from "./updateInformation";
import ordersReducer from "./orders";

const rootReducer = combineReducers({
  auth: authReducer,
  update: updateReducer,
  orders: ordersReducer,
});
export default rootReducer;
