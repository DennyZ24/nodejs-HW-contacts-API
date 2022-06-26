const express = require('express');

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite
} = require('../../controllers/contactsControll');
const { auth } = require('../../middlewares/auth');


const router = express.Router()

router.get('/', auth, getContacts)

router.get('/:contactId', auth, getContactById)

router.post('/', auth, addContact)

router.delete('/:contactId', auth, removeContact)

router.put('/:contactId', auth, updateContact)
 
router.patch('/:contactId/favourite', auth, updateFavorite)

module.exports = router
