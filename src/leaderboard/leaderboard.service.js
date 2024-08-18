const utils = require("../utils/index");

function parseData(data){

  let users = Array.from(data[0]);
  users.shift();
  users.pop();

  let betDates = {};

  for(let i = 1; i < data.length; i++){
    if(data[i].length > 1){
    
      let colunm = data[i];

      //construindo o indice
      let date = colunm[0];
      date = date.split('/');
      let formattedDate = `2024-${date[1]}-${date[0]}`;

      betDates[formattedDate] = {};
      betDates[formattedDate]['bets'] = {};

      if(users.length + 2 == colunm.length){
        for(let j = 1; j < colunm.length; j++){
          if(j != colunm.length-1){
            betDates[formattedDate]['bets'][users[j-1]] = colunm[j];
          } else {
            betDates[formattedDate]['score'] = colunm[j];
          }
        }
      }
    }
  }

  let response = {users,betDates}

  //console.log(JSON.stringify(response));

  return response;
}

function calculateDifferences(bets, score){
  let difference = {};

  Object.keys(bets).forEach(user => {
    if(bets[user]){
      if(bets[user] > score) difference[user] = bets[user] - score
      else if (bets[user] == score) difference[user] = 0
      else difference[user] = score - bets[user]
    }
  });

  return difference;
}

function findWinners(difference){

  let winner = {
    user: "",
    bet: 5,
  };

  let twoWinners = false;

  let winners = new Array();

  for(user of Object.keys(difference)){
    //Calcular Snipada
    if(difference[user] == 0){
      return twoWinners, [{user, score: 3}];
    }
    else if(difference[user] <= winner.bet){
      winner.user = user;
      winner.bet = difference[user];
    }
  }

  //Ninguem acertou
  if(winner.user == ""){
    return twoWinners, [];
  }

  //Verificar se teve mais de um ganhador
  Object.keys(difference).forEach(user => {
    if(difference[user] == winner.bet  && user != winner.user){
      winners.push({ user, score: 1});
      twoWinners = true;
    }
  });

  winners.push({user: winner.user, score: 1});

  return twoWinners,winners;
}

function dayWinner(day, bets, score){
  
  let difference = calculateDifferences(bets, score);

  let winners = findWinners(difference);

  return winners;
}

function dayWinnerMessage(winners, score){
  let message = "Bom dia grupo\nPlanilha Atualizada\n\n";
  
  if(winners.length == 0){
    message += "Ninguém acertou\n";
    message += "\nNota do Sono: " + score;
    return message;
  }

  message += "Parabens";

  
  winners.forEach(winner => {
    message += " " + winner.user + " e" ;
  })

  message = message.slice(0, -2);
  if(winners.length == 2){
    message +=  " - Acerto aproximado"
  }
  else{
    winners.forEach(ganhador => {
      if(ganhador.score == 1){
        message +=  " - Acerto aproximado"
      } else {
        message +=  " - SNIPOU"
      }
    })
    
  }

  message += "\n\nNota do Sono: " + score + "\n";

  return message;
}

function getLeaderboard(data){

  let parsedData = parseData(data);

  //console.log(parsedData);

  let betsMonth = parsedData.betDates;
  let counting = [];

  let message = "";

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1)
  yesterday = yesterday.toISOString().split("T")[0];
    
  for(day of Object.keys(betsMonth)){
    let {bets, score} = betsMonth[day]
    counting[day] = dayWinner(day, bets, score);
    if(day == yesterday) message += dayWinnerMessage(counting[day], score);
  }

  //console.log(counting);

  let sum = [];

  for(day of Object.keys(counting)){
    counting[day].forEach(item => {
      //console.log(item)
      let {user, score} = item;
      if(!sum[user]){
        sum[user] = score;
      } else {
        sum[user] += score;
      } 
    })
  }

  //console.log(sum);

  //pegar maior
  let max = 0;
  
  for(user of Object.keys(sum)){
    if(sum[user] >= max){
      max = sum[user];
    }
  }

  let leaderboard = [];
  let position = 1;

  let users = parsedData.users;
  //remove usuario que tem pontos
  for(nome of Object.keys(sum)){
    users = users.filter((user) => {return user != nome})
  }

  for(let i = max; i >= 0; i--){
    for(user of Object.keys(sum)){
        if(sum[user] == i){
          leaderboard.push({
            position,
            user,
            score: sum[user]
          })
          position++;
        }
      }
  }
  for(user of users){
    leaderboard.push({
      position,
      user,
      score: 0
    })
    position++;
  }

  const month = utils.getMonth();

  message += "\`\`\`\n[Leaderboard - "+ month +"]\n";

  leaderboard.forEach(place => {
    let {position, user, score} = place;
    message += position + "º - " + score + " pontos - " + user + "\n";
  })

  message += `\`\`\``;

  // console.log(message);

  return {
    leaderboard,
    message
  }

  
}

module.exports = {getLeaderboard};