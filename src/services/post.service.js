const Post = require("../models/post.model");
const Like = require("../models/like.model");

async function createPostServices({ user_id, content, image_url }) {
  // uploadedImages = hasil dari proses upload ke Cloudinary/S3,
  // formatnya array of { url, publicId }
  const post = await Post.create({
    author: user_id,
    postContext: content,
    images: image_url,
  });

  return post;
}

async function deletePostServices({ user_id, post_id }) {
  // uploadedImages = hasil dari proses upload ke Cloudinary/S3,
  // formatnya array of { url, publicId }
  console.log(user_id, post_id);
  const post = await Post.deleteOne({
    _id: post_id,
    author: user_id,
  });

  return post;
}

async function getPostServices({ page, limit, user_id }) {
  // uploadedImages = hasil dari proses upload ke Cloudinary/S3,
  // formatnya array of { url, publicId }
  // const posts = await Post.find().populate("author");

  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Post.countDocuments(),
  ]);

  const likes = await Like.find({
    user: user_id,
    post: {
      $in: posts.map((post) => post._id),
    },
  });
  const likedPostIds = new Set(likes.map((like) => like.post.toString()));
  const result = posts.map((post) => ({
    ...post,
    isLiked: likedPostIds.has(post._id.toString()),
  }));

  return {
    posts: result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function likePostService(userId, postId) {
  const alreadyLiked = await Like.findOne({
    user: userId,
    post: postId,
  });

  if (alreadyLiked) {
    const deleted = await Like.findOneAndDelete({
      user: userId,
      post: postId,
    });

    if (deleted) {
      await Post.findByIdAndUpdate(postId, {
        $inc: {
          likesCount: -1,
        },
      });
    }
  } else {
    await Like.create({
      user: userId,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId, {
      $inc: {
        likesCount: 1,
      },
    });
  }
}

module.exports = {
  createPostServices,
  getPostServices,
  deletePostServices,
  likePostService,
};
