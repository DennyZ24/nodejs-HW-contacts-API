const express = require('express');

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite
} = require('../../controllers/contactsControll');


const router = express.Router()

router.get('/', getContacts)

router.get('/:contactId', getContactById)

router.post('/', addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', updateContact)
 
router.patch('/:contactId', updateFavorite)

module.exports = router
