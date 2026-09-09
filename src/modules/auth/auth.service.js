const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../../common/utils/ApiError');
const env = require('../../config/env');
const repo = require('./auth.repository');

function sign(user) {
  return jwt.sign({ email: user.email }, env.JWT_SECRET, { subject: String(user.id), expiresIn: env.JWT_EXPIRES_IN });
}
async function register(body) {
  const exists = await repo.findByEmail(body.email);
  if (exists) throw new ApiError(409, 'Email already exists');
  const password = await bcrypt.hash(body.password, 10);
  const user = await repo.create({ name: body.name, email: body.email, password });
  return { user, token: sign(user) };
}
async function login(body) {
  const user = await repo.findByEmail(body.email);
  if (!user) throw new ApiError(401, 'Invalid credentials');
  const ok = await bcrypt.compare(body.password, user.password);
  if (!ok) throw new ApiError(401, 'Invalid credentials');
  return { user: { id: user.id, name: user.name, email: user.email }, token: sign(user) };
}
module.exports = { register, login };
