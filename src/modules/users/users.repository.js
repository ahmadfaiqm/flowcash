const prisma = require('../../config/database');

async function findMany(skip, take) {
  return prisma.user.findMany({ skip, take, orderBy: { id: 'asc' }, select: { id: true, name: true, email: true, createdAt: true, updatedAt: true } });
}
async function count() { return prisma.user.count(); }
async function findById(id) {
  return prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, createdAt: true, updatedAt: true } });
}
async function create(data) {
  return prisma.user.create({ data, select: { id: true, name: true, email: true, createdAt: true } });
}
module.exports = { findMany, count, findById, create };
