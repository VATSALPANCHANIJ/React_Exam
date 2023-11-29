import { createStore } from "redux";
import rootdata from "./reducers";

const store = createStore(rootdata);

export default store