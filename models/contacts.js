const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  return allContacts.find(contact => contact.id === contactId);
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const deletedContact = allContacts.find(contacts => contacts.id === contactId);
  if (!deletedContact) {
    return null;
  }
  const newContactsList = JSON.stringify(allContacts.filter(contact => contact.id !== contactId));
  fs.writeFile(contactsPath, newContactsList);
  return deletedContact;
}

const addContact = async (newContact) => {
  const allContacts = await listContacts();
  const newContactsList = JSON.stringify([...allContacts, newContact]);

  fs.writeFile(contactsPath, newContactsList)
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contactById = await getContactById(contactId); 
  if (!contactById) {
    return null
  }

  const newContactsList = JSON.stringify(allContacts.map(contact => {
    if (contact.id !== contactId) {
      return contact
    }
    return { ...contact, ...body };
  }))

  fs.writeFile(contactsPath, newContactsList);

  return {...contactById, ...body};
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
