const {google} = require('googleapis');

function calcularDistacia(apostas, pontuacao){
  let distancia = {};

  Object.keys(apostas).forEach(usuario => {
    if(apostas[usuario]){
      if(apostas[usuario] > pontuacao) distancia[usuario] = apostas[usuario] - pontuacao
      else if (apostas[usuario] == pontuacao) distancia[usuario] = 0
      else distancia[usuario] = pontuacao - apostas[usuario]
    }
  });

  return distancia;
}

function encontrarVencedores(distancia){

  let ganhador = {
    usuario: "",
    aposta: 5,
  };

  let maisDeUmGanhador = false;

  let ganhadores = new Array();

  for(usuario of Object.keys(distancia)){
    //Calcular Snipada
    if(distancia[usuario] == 0){
      return maisDeUmGanhador, [{usuario, pontuacao: 3}];
    }
    else if(distancia[usuario] <= ganhador.aposta){
      ganhador.usuario = usuario;
      ganhador.aposta = distancia[usuario];
    }
  }

  //Ninguem acertou
  if(ganhador.usuario == ""){
    return maisDeUmGanhador, [];
  }

  //Verificar se teve mais de um ganhador
  Object.keys(distancia).forEach(usuario => {
    if(distancia[usuario] == ganhador.aposta  && usuario != ganhador.usuario){
      ganhadores.push({usuario, pontuacao: 1});
      maisDeUmGanhador = true;
    }
  });

  ganhadores.push({usuario: ganhador.usuario, pontuacao: 1});

  return maisDeUmGanhador,ganhadores;
}

function montarMensagem(ganhadores, pontuacao){
  let mensagem = "Bom dia grupo\nPlanilha Atualizada\n\n";
  
  if(ganhadores.length == 0){
    mensagem += "Ninguem acertou\n";
    mensagem += "\nNota do Sono: " + pontuacao;
    return mensagem;
  }

  mensagem += "Parabens";

  
  ganhadores.forEach(ganhador => {
    mensagem += " " + ganhador.usuario + " e" ;
  })

  mensagem = mensagem.slice(0, -2);
  if(ganhadores.length == 2){
    mensagem +=  " - Acerto aproximado"
  }
  else{
    ganhadores.forEach(ganhador => {
      if(ganhador.pontuacao == 1){
        mensagem +=  " - Acerto aproximado"
      } else {
        mensagem +=  " - SNIPOU"
      }
    })
    
  }

  mensagem += "\n\nNota do Sono: " + pontuacao;

  return mensagem;
}

function calcularVencedorDoDia(day, apostas, pontuacao){
  
  let distancia = calcularDistacia(apostas, pontuacao);

  let ganhadores = encontrarVencedores(distancia);

  let mensagem = montarMensagem(ganhadores, pontuacao);

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1)
  yesterday = yesterday.toISOString().split("T")[0];

  if(day == yesterday){
    console.log(mensagem);
  }

  return ganhadores;
}

async function getDataFromGoogleSheetAPI(){
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  
  // Create client instance for auth
  const client = await auth.getClient();
  
  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  
  const spreadsheetId = "15maJIAB28avJGYQ-03u1b4C_QmcOtQioHPWcEolVors";
  
  const getRows = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Abril!B1:AF9',
    majorDimension: "COLUMNS"
  });

  let data = getRows.data.values;

  let users = data[0];
  users.shift();
  users.pop();

//console.log(data);

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

      for(let j = 1; j < colunm.length; j++){
        if(j != colunm.length-1){
          betDates[formattedDate]['bets'][users[j-1]] = colunm[j];
        } else {
          betDates[formattedDate]['score'] = colunm[j];
        }
      }
    }
  }

  let response = {users,betDates}

  //console.log(JSON.stringify(response));

  return response;
  
}

async function calcularLeaderBoard(){
  const data = await getDataFromGoogleSheetAPI();

  let betsMonth = data.betDates;
  let counting = [];
  let sum = [];
  
  for(day of Object.keys(betsMonth)){
    let {bets, score} = betsMonth[day]
    counting[day] = calcularVencedorDoDia(day,bets, score);
  }

  for(day of Object.keys(counting)){
    counting[day].forEach(item => {
      let {usuario, pontuacao} = item;
      if(!sum[usuario]){
        sum[usuario] = pontuacao;
      } else {
        sum[usuario] += pontuacao;
      } 
    })
  }

  //pegar maior
  let max = 0;
  
  for(user of Object.keys(sum)){
    if(sum[user] >= max){
      max = sum[user];
    }
  }

  let leaderboard = [];
  let position = 1;

  let users = data.users;
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

  let message = "\`\`\`\n[Leaderboard - Abril]\n";

  leaderboard.forEach(place => {
    let {position, user, score} = place;
    message += position + "º - " + score + " pontos - " + user + "\n";
  })

  message += `\`\`\``;

  console.log(message);

  require('child_process').spawn('clip').stdin.end(message);

  //return leaderboard, message;

}

calcularLeaderBoard();

//calcularVencedorDoDia(apostasComSnipada, pontuacao);


//Todo
/*
  [x] - somar pontos
  [x] - ordernar e imprimir
  [x] - imprimir apenas dia atual
  [x] - coletar dados
  [ ] - ordernar por snipadas
  [ ] - ordernar por quantidade de votos
*/