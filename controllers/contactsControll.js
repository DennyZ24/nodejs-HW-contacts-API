const contactsServices = require('../services/contactsServices');
const { schemaCreate, schemaPutch } = require('../models/contacts');

const {createError} = require('../helpers/createErrors')


const getContacts = async (req, res, next) => {
  const contactsList = await contactsServices.getContacts(); 
  res.json(contactsList)
};

const getContactById = async (req, res, next) => {
 try {
   const contact = await contactsServices.getContactById(req.params.contactId); 
   if (!contact) {
    throw createError(404, 'Not Found')
   }
    res.json(contact);
 } catch (error) {
    next(error)
 }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemaCreate.validate(req.body)
    
      if (error) {
        throw createError(400, 'missing required field: name, email, phone')
    }
  const newContact = await contactsServices.addContact(req.body); 
  res.status(201).json(newContact);
  } catch (error) {
    next(error)
  }
};
  
  const removeContact = async (req, res, next) => {
    try {
      const removeContact = await contactsServices.removeContact(req.params.contactId); 

      if (!removeContact) {
        throw createError(404, 'Not Found')
      }

      res.json(removeContact);
    } catch (error) {
      next(error)
    }
};

const updateContact = async (req, res, next) => {
  
  try {
    if (Object.keys(req.body).length === 0) {
      throw createError(400, 'missing fields')
    }
    const updateContact = await contactsServices.updateContact(req.params.contactId, req.body); 
    res.json(updateContact)
  } catch (error) {
    next(error)
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = schemaPutch.validate(req.body);

    if (error) {
      throw createError(400, 'missing field favorite');
    }

    const updateFavoriteFields = await contactsServices.updateFavorite(req.params.contactId, req.body); 
    res.json(updateFavoriteFields)
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};