const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./auth.model');
const { prepareUser, prepareUserWithToken } = require('./users.serializer');

async function signUp(req, res, next) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Conflict(`User with email '${email}' already exists`);
  }

  const hashedPassword = await bcrypt.hash(password, 2);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).send(prepareUser(newUser));
}

async function signIn(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized('Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Unauthorized('Email or password is wrong');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).send(prepareUserWithToken({ user, token }));
}

async function logout(req, res, next) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send('No Content');
}

module.exports = {
  signUp,
  signIn,
  logout,
};
