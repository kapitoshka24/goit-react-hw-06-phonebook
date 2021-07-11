import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import contactsReducers from "./contacts-reducers";

const rootReducer = combineReducers({ contacts: contactsReducers });

const store = createStore(rootReducer, composeWithDevTools());

export default store;
