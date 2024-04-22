const dataService = require("../data/data.service");
const utils = require("../utils/index");

const formatUsers = (data) => {
  let users = data[0];
  users.shift();
  users.pop();
  return users;
}

const findDateVotes = (date, data) => {
  for(day of data){
    if(day[0] == date){
      return day;
    }
  }

  return null;
}

const getUsers = async () => {
  let data = await dataService.getAllData();
  let users = formatUsers(data);
  return users;
}

const getMissingBettingUsers = async (date = null) => {
  if(date == null){
    date = utils.getDate();
  }

  let data = await dataService.getAllData();

  let bets = findDateVotes(date, data);

  //console.log(bets);

  let users = formatUsers(data);

  let usersMissingBet = [];
  for(let i = 1; i < bets.length; i++){
    console.log(bets[i]);
    if(bets[i] == '0'){
      console.log(users[i] + " não votou");
      usersMissingBet.push(users[i-1]);
    }
  }

  return usersMissingBet;
  
}


module.exports = {getUsers, getMissingBettingUsers};