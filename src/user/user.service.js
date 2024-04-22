const dataService = require("../data/data.service");

const getUsers = async () => {
  let data = await dataService.getAllData();
  let users = data[0];
  users.shift();
  users.pop();
  return users;
}

module.exports = {getUsers};