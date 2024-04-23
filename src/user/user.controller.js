const userService = require("./user.service");

const usersMap = {
  "Alan": "@Alan Kenji",
  "Alex": "@Alex Made",
  "Arthur": "@~Arthur Yo",
  "Daniel": "@Daniel",
  "Gruber": "@Gruber",
  "Loren": "@Mateus Lourenço",
  "Zé": "@Zé Badarants",
}

const createWhatsAppMessage = (users) => {
  let message = "";
  users.forEach((user) => {
    message += usersMap[user] + " "
  })

  if(users.length == 0){
    return "";
  } else if (users.length == 1) {
    message += " Não se esqueça de votar";
  } else {
    message += " Não se esqueçam de votar";
  }

  return message;
}

const getUsers = async (_request, response) => {
  const users = await userService.getUsers();
  const responseBody = {
    users,
  }
  return response.status(200).json(responseBody);
}

const getMissingBettingUsers = async (_request, response) => {
  const users = await userService.getMissingBettingUsers();
  let message = createWhatsAppMessage(users);

  const responseBody = {
    users,
    message
  }
  return response.status(200).json(responseBody);
}

module.exports = { getUsers, getMissingBettingUsers };