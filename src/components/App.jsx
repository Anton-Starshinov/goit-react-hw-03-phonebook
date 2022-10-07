import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Container, TitlePhoneBook } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const addContact = { id: nanoid(3), name, number };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === addContact.name.toLowerCase()
      )
    ) {
      return alert(`${addContact.name} is already in contacts`);
    }
    this.setState(({ contacts }) => ({
      contacts: [addContact, ...contacts],
    }));
  };

  cheageFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => {
      const NewContactsList = prevState.contacts.filter(item => item.id !== id);
      return { contacts: NewContactsList };
    });
  };

  render() {
    const { filter } = this.state;
    const VisibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <TitlePhoneBook>Phonebook</TitlePhoneBook>
        <Form onSubmit={this.formSubmitHandler} />
        <TitlePhoneBook>Contacts</TitlePhoneBook>
        <Filter value={filter} onChange={this.cheageFilter} />
        <ContactList contacts={VisibleContacts} onDelete={this.deleteContact} />
      </Container>
    );
  }
}
