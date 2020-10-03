const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
  login: {
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    trim: true,
  },
})

module.exports = mongoose.models.Login || mongoose.model('Login', LoginSchema)
