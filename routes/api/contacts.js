const express = require('express');

const {
  getContacts,
  getContactById,
  removeContact,
  addContact
} = require('../../controllers/contactsControll');
// const contacts = require('../../models/contacts');
// const Joi = require('joi');
// const { v4: uuidv4 } = require('uuid');

// const schema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   phone: Joi.string().required()
// });

const router = express.Router()

router.get('/', getContacts)

router.get('/:contactId', getContactById)

router.post('/', addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', async (req, res, next) => {
//   const body = req.body;

//   if (Object.keys(body).length === 0) {
//     res.status(400).json({ 'message': 'missing fields' })
//     return
//   }
//   const { contactId } = req.params;
//   const updateContact = await contacts.updateContact(contactId, body);
//   if (!updateContact) {
//     res.status(404).json({ 'message': 'Not found' })
//     return
//   }
//   res.json(updateContact);
})

module.exports = router
