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
    if(bets[i] == '0'){
      let j = i-1;
      if(users[j]){
        usersMissingBet.push(users[j]);
      }
    }
  }

  return usersMissingBet;
  
}

const getBetsByDate = (data, date = null) => {

  if(!date){
    date = utils.getDate();
  }

  let bets = findDateVotes(date, data);

  //console.log(bets)

  bets.shift();
  
  let users = formatUsers(data);

  let response = {bets: {}};

  for(let i = 0; i < users.length; i++){
    response.bets[users[i]] = bets[i];
  }

  return response;
}

const formatSheetsData = (data) => {

  return data.reduce((formatedSheetsData, row) => {
    row.forEach((value, column) => {
      if (!formatedSheetsData[column]) {
        formatedSheetsData[column] = [];
      }
      formatedSheetsData[column].push(value);
    });
    return formatedSheetsData;
  }, []);

  c
}

const setBets = async (date, values) => {
  let data = [];

  data.push(date);

  Object.values(values).forEach(value => {
    if(value == "") data.push("0")
    else data.push(value)
  });

  let columnIndex = 0;
  
  //found column index
  let sheetsData = await dataService.getAllData();

  for (let i = 0; i < sheetsData.length; i++) {
    const column = sheetsData[i];
    
    if(date == column[0]){
      columnIndex = i;
    }
  }

  //change colunm data
  sheetsData[columnIndex] = data;

  //change the data format
  let formatedSheetsData = formatSheetsData(sheetsData);

  //console.log(formatedSheetsData);

  //insert new data
  await dataService.setData(formatedSheetsData);

  return true;
}


module.exports = {getUsers, getMissingBettingUsers, getBetsByDate, setBets};