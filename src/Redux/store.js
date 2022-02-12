import { createStore } from "redux";
import { reducer } from "./comment/reducer";

export const store = createStore(reducer);
