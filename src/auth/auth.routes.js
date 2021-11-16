const express = require('express');
const router = express.Router();

const { validate } = require('../helpers/validate');
const { authorize } = require('./authorize.middleware');
const { signUp, signIn } = require('./auth.controller');
const { signupSchema, loginSchema } = require('./auth.schema');
const { prepareUser, prepareUserWithToken } = require('./users.serializer');

router.post('/signUp', validate(signupSchema), async (req, res, next) => {
  try {
    const user = await signUp(req.body);
    return res.status(201).send(prepareUser(user));
  } catch (err) {
    next(err);
  }
});

router.post('/signIn', validate(loginSchema), async (req, res, next) => {
  try {
    const user = await signIn(req.body);
    return res.status(200).send(prepareUserWithToken(user));
  } catch (err) {
    next(err);
  }
});

router.post('/logout', authorize, async (req, res, next) => {
  try {
    return res.status(204).send('No Content');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
