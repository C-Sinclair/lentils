import { combineReducers } from "../../lib/index.js";
import counterReducer from "./counter.js";

combineReducers({
  counter: counterReducer,
});
