const leaderboardService = require("./leaderboard.service");
const dataService = require("../data/data.service");

async function getLeaderboard(_request, response) {

  const data = await dataService.getAllData();

  let responseBody = leaderboardService.getLeaderboard(data);

  return response.status(200).json(responseBody);

}

module.exports = {getLeaderboard};