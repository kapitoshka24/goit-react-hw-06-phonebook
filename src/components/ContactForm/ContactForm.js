import React, { Component } from "react";
import shortid from "shortid";
import PropTypes from "prop-types";
import "./ContactForm.css";
import { connect } from "react-redux";
import * as actions from "../../redux/contacts/contacts-actions";

class ContactForm extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
      .isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    id: "",
    name: "",
    number: "",
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = (evt) => {
    const { name, value } = evt.target;

    this.setState({
      id: shortid.generate(),
      [name]: value,
    });
  };

  findByName = (contactName) => {
    return this.props.contacts.some(({ name }) => name === contactName);
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { name } = this.state;

    if (this.findByName(name)) {
      alert(`${name} is already in contacts!`);
      return;
    }

    this.props.onAdd(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            id={this.nameInputId}
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            onChange={this.handleChange}
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            id={this.numberInputId}
            required
          />
        </label>
        <button>Add contact</button>
      </form>
    );
  }
}

const mapStateToProps = ({ contacts: { items } }) => ({
  contacts: items,
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: (contact) => dispatch(actions.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
