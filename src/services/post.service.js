async function createPost({ authorId, postContext, image_url }) {
  // uploadedImages = hasil dari proses upload ke Cloudinary/S3,
  // formatnya array of { url, publicId }
  return Post.create({
    author: authorId,
    postContext,
    images: image_url,
  });
}

module.exports = {
  createPost,
};
