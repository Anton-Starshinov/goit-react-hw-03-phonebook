import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Container, TitlePhoneBook } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
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

  componentDidMount() {
    const contactLocal = localStorage.getItem('contact');
    const parsedContact = JSON.parse(contactLocal);
    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

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
