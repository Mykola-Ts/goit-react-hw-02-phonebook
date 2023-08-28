import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Section } from './Section/Section';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './Contacts/Contacts';
import { NoContactsText } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    const isIncludesName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isIncludesNumber = contacts.find(
      contact => contact.number === number
    );

    if (isIncludesName) {
      alert(`${name} is already in contacts`);

      return null;
    } else if (isIncludesNumber) {
      alert(`Number ${number} is already in contacts`);

      return null;
    }

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          id: nanoid(),
          name,
          number,
        },
      ],
    }));

    Notify.success(`${name} added to contacts`);
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
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Layout>
        <Section title="Phonebook">
          <AddContactForm onAddContact={onAddContact} />
        </Section>

        <Section title="Contacts">
          {contacts.length > 0 ? (
            <>
              <Filter onFilterContacts={onFilterContacts} />
              <ContactList
                contacts={visibleContacts}
                onDelete={onDeleteContact}
              />
              {!visibleContacts.length && (
                <NoContactsText>
                  No contacts found for the entered name
                </NoContactsText>
              )}
            </>
          ) : (
            <NoContactsText>No contacts</NoContactsText>
          )}
        </Section>

        <GlobalStyle />
      </Layout>
    );
  }
}
