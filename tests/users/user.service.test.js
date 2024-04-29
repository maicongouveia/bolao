const UserService = require("../../src/user/user.service");
const { data } = require("../mock/data")

test('returning bet data from date', () => {
  const date = "29/04";
  const response = {
    "bets": {
      "Alan": "0",
      "Alex": "80",
      "Arthur": "0",
      "Daniel": "0",
      "Gruber": "0",
      "Loren": "0",
      "Zé": "0",
    }
  };

  expect(UserService.getBetsByDate(data, date)).toEqual(response);
  
  
});