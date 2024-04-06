const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(data) {
  return prisma.users.create({ data });
}

async function getUser(id) {
  return prisma.users.findUnique({ where: { id: id } });
}

async function updateUser(id, data) {
  return prisma.users.update({ where: { id: id }, data });
}

async function deleteUser(id) {
  return prisma.users.delete({ where: { id: id } });
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};
