const prisma = require('../../config/database');

async function findByEmail(email) { return prisma.user.findUnique({ where: { email } }); }
async function create(data) {
  return prisma.user.create({ data, select: { id: true, name: true, email: true, role: true, createdAt: true } });
}
module.exports = { findByEmail, create };
