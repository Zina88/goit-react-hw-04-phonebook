import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Modal from './Modal';
import IconButton from './IconButton';
import css from './App.module.css';

Report.init({
  width: '300px',
  borderRadius: '15px',
});

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    showModal: false,
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name === name)
      ? Report.warning(`${name}`, 'This user is already in contact!', 'Close')
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }));

    this.toggleModal();
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { filter, showModal } = this.state;
    const length = this.state.contacts.length;

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>

        <IconButton onClick={this.toggleModal} className={css.addContact} aria-label="Add contact">
          Add contact
        </IconButton>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactForm onSubmit={this.addContact} />
          </Modal>
        )}
        <h2 className={css.title}>Contacts</h2>
        {length > 0 ? (
          <div>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList contacts={this.getVisibleContact()} onDeleteContact={this.deleteContact} />
          </div>
        ) : (
          <p className={css.isEmpty}>Contact list is empty</p>
        )}
      </div>
    );
  }
}

export default App;
