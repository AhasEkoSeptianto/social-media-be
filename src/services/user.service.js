const User = require("../models/user.model");

async function getUsersList(keyword) {
  const users = await User.find({
    $or: [
      {
        name: {
          $regex: keyword,
          $options: "i", // tidak case-sensitive
        },
      },
      {
        username: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  })
    .select("-password")
    .limit(20)
    .lean();

  return users;
}

module.exports = { getUsersList };
