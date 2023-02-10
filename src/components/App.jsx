import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+48 (42) 459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '+48 (42) 443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '+48 (42) 645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '+48 (42) 227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    try {
      const contacts = JSON.parse(localStorage.getItem('stateContacts'));
      if (contacts) {
        this.setState({ contacts: contacts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevState) {
    try {
      if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem(
          'stateContacts',
          JSON.stringify(this.state.contacts)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleAddContact = newContact => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toUpperCase() === newContact.name.toUpperCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return true;
    }
    this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
  };

  contacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toUpperCase().includes(filter.toUpperCase())
    );
  };

  handelFilterContacts = filter => this.setState({ filter });

  handelRemoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  render() {
    const contacts = this.contacts();
    const { filter } = this.state;
    return (
      <div style={{ margin: 50 }}>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handelFilterContacts} />
        <ContactList
          contacts={contacts}
          onRemoveContact={this.handelRemoveContact}
        ></ContactList>
      </div>
    );
  }
}
