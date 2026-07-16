const { getUsersList } = require("../services/user.service");

async function getUsers(req, res, next) {
  try {
    const keyword = req.query.search || "";
    const users = await getUsersList(keyword);

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers };
