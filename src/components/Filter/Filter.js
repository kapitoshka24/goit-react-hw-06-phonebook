import React from "react";
import PropTypes from "prop-types";
import "./Filter.css";
import * as actions from "../../redux/contacts/contacts-actions";
import { connect } from "react-redux";

const Filter = ({ value, onChangeFilter }) => (
  <label>
    Find contacts by name
    <input type="text" value={value} onChange={onChangeFilter} />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ contacts: { filter } }) => ({
  value: filter,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (evt) => dispatch(actions.changeFilter(evt.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
