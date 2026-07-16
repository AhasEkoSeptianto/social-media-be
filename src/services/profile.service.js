const userModel = require("../models/user.model");

async function getProfileService(user_id) {
  const User = await userModel
    .find({
      _id: user_id,
    })
    .lean();

  return User;
}

async function updateProfileService(user_id, username, image_url, bio, tag) {
  const User = await userModel.findOneAndUpdate(
    { _id: user_id },
    { username: username, avatarUrl: image_url, bio: bio, tag: tag },
    { new: true },
  );

  return User;
}

module.exports = { getProfileService, updateProfileService };
