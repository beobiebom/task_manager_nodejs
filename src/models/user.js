const mongoose = require ('mongoose');
const validator = require ('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate (value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error ('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate (value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
})

//implement middleware before saving
userSchema.pre('save', async function (next) {
  const user = this

  //this will be true when the user is  first created and it will also
  // true if the user is being updated and password was one of things changed
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  //Implement saving
  next()
})

const User = mongoose.model ('User', userSchema);

module.exports = User
