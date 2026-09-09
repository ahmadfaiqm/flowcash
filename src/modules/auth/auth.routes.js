const express = require('express');
const asyncHandler = require('../../common/middlewares/asyncHandler');
const validate = require('../../common/middlewares/validate');
const auth = require('../../common/middlewares/auth');
const { registerSchema, loginSchema } = require('./auth.validation');
const { register, login, me } = require('./auth.controller');

const router = express.Router();
router.post('/register', validate('body', registerSchema), asyncHandler(register));
router.post('/login', validate('body', loginSchema), asyncHandler(login));
router.get('/me', auth, asyncHandler(me));
module.exports = router;
