const express = require('express');
const asyncHandler = require('../../common/middlewares/asyncHandler');
const validate = require('../../common/middlewares/validate');
const { createUserSchema } = require('./users.validation');
const { list, getById, create } = require('./users.controller');

const router = express.Router();
router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(getById));
router.post('/', validate('body', createUserSchema), asyncHandler(create));
module.exports = router;
