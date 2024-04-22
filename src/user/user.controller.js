const userService = require("./user.service");

const getUsers = async (_request, response) => {
  const users = await userService.getUsers();
  return response.status(200).json(users);
}

module.exports = { getUsers };