const { Conflict, Unauthorized, BadRequest, NotFound } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./auth.model');

async function signUp(userCreateParams) {
  const { email, password } = userCreateParams;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Conflict(`User with email '${email}' already exists`);
  }

  const hashedPassword = await bcrypt.hash(password, 2);

  const newUser = await User.create({
    ...userCreateParams,
    password: hashedPassword,
  });

  return newUser;
}

async function signIn(signInParams) {
  const { email, password } = signInParams;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized('Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Unauthorized('Email or password is wrong');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return { user, token };
}

module.exports = {
  signUp,
  signIn,
};
