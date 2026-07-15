const {
  createPostServices,
  getPostServices,
} = require("../services/post.service");

async function createPost(req, res, next) {
  try {
    const { content, image_url } = req.body;
    const user_id = req.user.id;
    if (!content) {
      return res.status(400).json({
        success: false,
        message: "content wajib diisi",
      });
    }
    const post = await createPostServices({ user_id, content, image_url });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
}

async function getPost(req, res, next) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const user_id = req.user.id;

    const posts = await getPostServices({ page, limit });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPost,
  getPost,
};
