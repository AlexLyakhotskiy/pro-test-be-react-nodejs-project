const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
