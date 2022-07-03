const {Contact} = require('../models/contacts')

const getContacts = async () => {
  return Contact.find();
}

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
}

const findContact = async (filters) => { 
  return Contact.findOne(filters);
};

const addContact = async (newContact) => {
  return Contact.create(newContact);
}

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
}

const updateContact = async (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, data, {new: true});
}

const updateFavorite = async (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, data, {new: true});
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
  findContact,
}