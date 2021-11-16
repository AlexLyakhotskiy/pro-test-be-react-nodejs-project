/** @format */

const { Conflict, Unauthorized, BadRequest, NotFound } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./auth.model");

async function signUpTest(userCreateParams) {
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

module.exports = {
  signUp,
  signIn,
};
