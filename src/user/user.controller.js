const userService = require("./user.service");
const dataService = require("../data/data.service");
const leaderboardService = require("../leaderboard/leaderboard.service");


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

const getBetsByDate = async(_request, response) => {
  const data = await dataService.getAllData();
  const {date} = _request.body;
  const bets = userService.getBetsByDate(data, date);

  return response.status(200).json(bets);
}

const setBets = async(_request, response) => {

  let {date, values} = _request.body;

  await userService.setBets(date, values);

  return response.status(200).json({message: "Sheets updated"});
}

const getSleepScore = async(_request, response) => {
  const data = await dataService.getSleepScore();
  const {date} = _request.body;
  const score = userService.getSleepScore(data, date);

  return response.status(200).json({score});
}

const setSleepScore = async(_request, response) => {

  let {date, score} = _request.body;

  try {
    await userService.setSleepScore(date, score);
    return response.status(200).json({
      data: {
              date,
              score
            },
      message: "sleep score updated"
      });
  } catch (error) {
    return response.status(500).json({
      data: {
              date,
              score
            },
      message: error.message
      });
  } 

}

const pageInfo = async (_request, response) => {
  const data = await dataService.getAllData();

  const leaderBoardResponse = leaderboardService.getLeaderboard(data);
  const betsResponse = userService.getBetsByDate(data);

  return response.status(200).json({
    leaderBoardResponse,
    betsResponse,
  });
}

module.exports = { getUsers, getMissingBettingUsers, getBetsByDate, setBets, getSleepScore, setSleepScore, pageInfo };