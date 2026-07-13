async function createPost({ authorId, postContext, uploadedImages }) {
  // uploadedImages = hasil dari proses upload ke Cloudinary/S3,
  // formatnya array of { url, publicId }
  return Post.create({
    author: authorId,
    postContext,
    images: uploadedImages,
  });
}

module.exports = {
  createPost,
};
