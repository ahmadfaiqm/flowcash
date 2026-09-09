const { success } = require('../../common/utils/ApiResponse');
const service = require('./auth.service');

async function register(req, res) {
  const result = await service.register(req.body);
  return success(res, result, 'Registered', undefined, 201);
}
async function login(req, res) {
  const result = await service.login(req.body);
  return success(res, result, 'Logged in');
}
async function me(req, res) {
  return success(res, { user: req.user }, 'Profile');
}
module.exports = { register, login, me };
