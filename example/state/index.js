import { combineReducers } from "despot";
import counterReducer from "./counter.js";

combineReducers({
  counter: counterReducer,
});
