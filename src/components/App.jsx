import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Section } from './Section/Section';
import { Contacts } from './Contacts/Contacts';
import { AddContactForm } from './AddContactForm/AddContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddContact = evt => {
    const { contacts } = this.state;

    evt.preventDefault();

    const inputName = evt.target.name.value;
    const inputNumber = evt.target.phone_number.value;
    const isIncludesName = contacts.find(
      ({ name }) => name.toLowerCase() === inputName.toLowerCase()
    );
    const isIncludesNumber = contacts.find(
      ({ number }) => number === inputNumber
    );

    if (isIncludesName) {
      alert(`${inputName} is already in contacts`);

      return;
    } else if (isIncludesNumber) {
      alert(`Number ${inputNumber} is already in contacts`);

      return;
    }

    const newContact = {
      id: nanoid(),
      name: inputName,
      number: inputNumber,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));

    Notify.success(`${inputName} added to contacts`);

    evt.target.reset();
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  onFilterContacts = findName => {
    this.setState({ filter: findName });
  };

  render() {
    const { state, onAddContact, onDeleteContact, onFilterContacts } = this;
    const { contacts, filter } = state;
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Layout>
        <Section title="Phonebook">
          <AddContactForm onAddContact={onAddContact} />
        </Section>

        <Section title="Contacts">
          <Contacts
            contacts={contacts}
            visibleContacts={visibleContacts}
            onDelete={onDeleteContact}
            onFilterContacts={onFilterContacts}
            id="contacts"
          />
        </Section>

        <GlobalStyle />
      </Layout>
    );
  }
}
