const { PrismaClient } = require("@prisma/client");
const { Post } = require("../utils/prisma");

const prisma = new PrismaClient();

exports.getPosts = (req, res) => {
  res.render("postslist");
};

exports.createPostGet = (req, res) => {
  res.render("createpost");
};

exports.postNewPost = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  if (!title || !description) {
    res.status(400).send({ msg: "No title and No Description Found!" });
  }
  try {
    const post = await Post.create({
      data: { title, des: description, userId },
    });
    res.redirect("/login");
  } catch (error) {
    console.log("An error occured while creating Post: ", error);
  }
};
