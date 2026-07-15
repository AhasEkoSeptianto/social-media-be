const {
  createPostServices,
  getPostServices,
  deletePostServices,
  likePostService,
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

    const posts = await getPostServices({ page, limit, user_id });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}
async function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const posts = await deletePostServices({ user_id, post_id: id });
    console.log(posts);

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function likePost(req, res, next) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const posts = await likePostService(user_id, id);

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  createPost,
  getPost,
  deletePost,
  likePost,
};
