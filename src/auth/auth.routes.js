const express = require('express');
const router = express.Router();

const { validate } = require('../helpers/validate');
const { authorize } = require('./authorize.middleware');
const { signUp, signIn, logout } = require('./auth.controller');
const { signupSchema, loginSchema } = require('./auth.schema');
const { controllerWrapper } = require('../helpers/controllerWrapper');

router.post('/signUp', validate(signupSchema), controllerWrapper(signUp));

router.post('/signIn', validate(loginSchema), controllerWrapper(signIn));

router.post('/logout', authorize, controllerWrapper(logout));

module.exports = router;
