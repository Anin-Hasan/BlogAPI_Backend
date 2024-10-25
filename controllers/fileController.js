const { PrismaClient } = require("@prisma/client");
const { Post, User } = require("../utils/prisma");

const prisma = new PrismaClient();

exports.getHome = async (req, res) => {
  try {
    const posts = await Post.findMany({
      include: {
        user: true, // Include user information
      },
    });
    res.render("home", { posts });
  } catch (error) {
    console.log(error);
  }
};

exports.getPosts = async (req, res) => {
  const userId = req.user.id;
  const user = req.user;
  try {
    const posts = await Post.findMany({ where: { userId } });
    res.render("postslist", { posts, user });
  } catch (error) {
    console.log("error fetching posts");
  }
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
