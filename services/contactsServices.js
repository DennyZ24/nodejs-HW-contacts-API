const {Contact} = require('../models/contacts')

const getContacts = async () => {
  return Contact.find();
}

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
}


const addContact = async (newContact) => {
  return Contact.create(newContact);
}

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
}

const updateContact = async (contactId, body) => {
  // const allContacts = await listContacts();
  // const contactById = await getContactById(contactId); 
  // if (!contactById) {
  //   return null
  // }

  // const newContactsList = JSON.stringify(allContacts.map(contact => {
  //   if (contact.id !== contactId) {
  //     return contact
  //   }
  //   return { ...contact, ...body };
  // }))

  // fs.writeFile(contactsPath, newContactsList);

  // return {...contactById, ...body};
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}