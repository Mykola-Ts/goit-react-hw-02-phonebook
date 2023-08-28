import { Component } from 'react';
import { IoMdPersonAdd } from 'react-icons/io';
import {
  ContactInput,
  ContactLabel,
  SubmitButton,
} from './AddContactForm.styled';

export class AddContactForm extends Component {
  state = {
    contact: { inputName: '', inputNumber: '' },
  };

  onChange = evt => {
    this.setState(prevState => {
      if (evt.target.name === 'name') {
        return {
          contact: { ...prevState.contact, inputName: evt.target.value },
        };
      } else if (evt.target.name === 'phone_number') {
        return {
          contact: { ...prevState.contact, inputNumber: evt.target.value },
        };
      }
    });
  };

  onSubmit = evt => {
    const { onAddContact } = this.props;
    const { contact } = this.state;

    evt.preventDefault();

    const isIncludesName = onAddContact(contact);

    if (isIncludesName === null) {
      return;
    }

    evt.target.reset();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <ContactLabel>
          Name
          <ContactInput
            type="text"
            name="name"
            onChange={this.onChange}
            placeholder="First name Last name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </ContactLabel>

        <ContactLabel>
          Number
          <ContactInput
            type="tel"
            name="phone_number"
            onChange={this.onChange}
            placeholder="000-00-00"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </ContactLabel>

        <SubmitButton type="submit">
          <IoMdPersonAdd size={20} />
          Add contact
        </SubmitButton>
      </form>
    );
  }
}
