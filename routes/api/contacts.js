const express = require('express');
const contacts = require('../../models/contacts');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required()
});

const router = express.Router()

router.get('/', async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId}  = req.params;
  const contactById = await contacts.getContactById(contactId);
  contactById ? res.json(contactById) : res.status(404).send({'message': 'Not found'})
})

router.post('/', async (req, res, next) => {
  const body = req.body;
  const {error} = schema.validate(body);
  if (error) {
    res.status(400).json({ 'message': `missing ${error.message}` })
    return
  }
  const newContact = { ...body, id: uuidv4() }
  await contacts.addContact(newContact);
  res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    res.status(404).json({ 'message': 'Not found' });
  }
  res.json({ message: 'contact deleted', contact:  deletedContact})
})

router.put('/:contactId', async (req, res, next) => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    res.status(400).json({ 'message': 'missing fields' })
    return
  }
  const { contactId } = req.params;
  const updateContact = await contacts.updateContact(contactId, body);
  if (!updateContact) {
    res.status(404).json({ 'message': 'Not found' })
    return
  }
  res.json(updateContact);
})

module.exports = router
