const { Schema, model } = require('mongoose');
const Joi = require('joi');
const gravatar = require('gravatar');
const {v4} = require('uuid');

const schema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: () => {
      return gravatar.url(this.email, {}, true)
    }
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
    default: function () {
            return v4();
        }
  },
});

const User = model('user', schema);

const schemaAuth = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(5).required(),
});

const schemaResendEmail = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
})

module.exports = { User, schemaAuth, schemaResendEmail };