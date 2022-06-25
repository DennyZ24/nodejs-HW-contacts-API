const {Schema, model} = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});


const schemaCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const schemaPutch = Joi.object({
  favorite: Joi.bool().required(),
})


const Contact = model('contact', schema);

module.exports = { Contact, schemaCreate, schemaPutch };