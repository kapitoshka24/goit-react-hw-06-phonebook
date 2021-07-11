import { configureStore } from "@reduxjs/toolkit";
import contactsReducers from "./contacts/contacts-reducers";

const store = configureStore({
  reducer: {
    contacts: contactsReducers,
  },
});

export default store;
