import { types } from "./contacts-types";

export const addContact = (contact) => ({
  type: types.ADD,
  payload: contact,
});

export const deleteContact = (contactId) => ({
  type: types.DELETE,
  payload: contactId,
});

export const changeFilter = (value) => ({
  type: types.CHANGE_FILTER,
  payload: value,
});
