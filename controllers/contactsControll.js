const contactsServices = require('../services/contactsServices');


const getContacts = async (req, res, next) => {
  const contactsList = await contactsServices.getContacts(); 
  res.json(contactsList)
};

const getContactById = async (req, res, next) => {
 try {
    const contact = await contactsServices.getContactById(req.params.contactId); 
    res.json(contact);
 } catch (error) {
    next(error)
 }
};

const addContact = async (req, res, next) => {
  const newContact = await contactsServices.addContact(req.body); 
  res.status(201).json(newContact);
};
  
  const removeContact = async (req, res, next) => {
    const removeContact = await contactsServices.removeContact(req.params.contactId); 
    res.json(removeContact);
};

// const getContacts = async (req, res, next) => {
//   const contactsList = await contactsServices.getContacts(); 
//   res.json(contactsList)
// };

// const getContacts = async (req, res, next) => {
//   const contactsList = await contactsServices.getContacts(); 
//   res.json(contactsList)
// };

module.exports = { getContacts, getContactById, addContact, removeContact };