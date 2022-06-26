const {Contact} = require('../models/contacts')

const getContacts = async () => {
  return Contact.find();
}

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
  
}


const addContact = async (newContact) => {
  return Contact.create(newContact);
}

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
}

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, {new: true});
}

const updateFavorite = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, {new: true});
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite
}