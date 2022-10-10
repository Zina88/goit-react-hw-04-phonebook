import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name === name)
      ? Report.warning(`${name}`, 'This user is already in contact!', 'Close')
      : setContacts(prevContacts => [...prevContacts, newContact]);

    toggleModal();
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const length = contacts.length;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>

      <IconButton onClick={toggleModal} className={css.addContact} aria-label="Add contact">
        Add contact
      </IconButton>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={addContact} />
        </Modal>
      )}
      <h2 className={css.title}>Contacts</h2>
      {length > 0 ? (
        <div>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={getVisibleContact()} onDeleteContact={deleteContact} />
        </div>
      ) : (
        <p className={css.isEmpty}>Contact list is empty</p>
      )}
    </div>
  );
}
