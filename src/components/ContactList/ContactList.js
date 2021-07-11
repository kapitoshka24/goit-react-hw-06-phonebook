import React from "react";
import shortid from "shortid";
import PropTypes from "prop-types";
import "./ContactList.css";
import { connect } from "react-redux";
import * as actions from "../../redux/contacts/contacts-actions";

const ContactList = ({ items, onDelete }) => (
  <ol>
    {items.map(({ id, name, number }) => (
      <li key={shortid.generate()}>
        {name}: {number}
        <button onClick={() => onDelete(id)}>Delete</button>
      </li>
    ))}
  </ol>
);

ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  items: getVisibleContacts(items, filter),
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (contactId) => dispatch(actions.deleteContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
