const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = prisma.user;
const Post = prisma.post;
const Comment = prisma.comment;

module.exports = {
  User,
  Post,
  Comment,
};
