const userService = require("./user.service");

const getUsers = async (_request, response) => {
  const users = await userService.getUsers();
  const responseMessage = {
    users,
  }
  return response.status(200).json(responseMessage);
}

const getMissingBettingUsers = async (_request, response) => {
  const users = await userService.getMissingBettingUsers();
  const responseMessage = {
    users,
  }
  return response.status(200).json(responseMessage);
}

module.exports = { getUsers, getMissingBettingUsers };