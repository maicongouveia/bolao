let apostasUmGanhadorAproximado = {
  "Alan":81,
  "Alex":84,
  "Arthur":0,
  "Daniel":83,
  "Gruber":89,
  "Loren":80,
  "Zé":82,
}

let apostasDoisGanhadoresAproximado = {
  "Alan":81,
  "Alex":84,
  "Arthur":76,
  "Daniel":83,
  "Gruber":89,
  "Loren":80,
  "Zé":82,
}

let apostasComSnipada = {
  "Alan":81,
  "Alex":78,
  "Arthur":82,
  "Daniel":80,
  "Gruber":86,
  "Loren":85,
  "Zé":77
}

let apostasNinguemAcertou = {
  "Alan":60,
  "Alex":84,
  "Arthur":98,
  "Daniel":63,
  "Gruber":89,
  "Loren":99,
  "Zé":62,
}

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

function montarMensagem(ganhadores){
  let mensagem = `
    Bom dia grupo
    Planilha Atualizada`; 
  
  if(ganhadores.length == 0){
    mensagem += `
    Ninguem acertou
    `;

    return mensagem;
  }

  mensagem += `
    Parabens`;

  
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

  mensagem += `
  `

  return mensagem;
}

let pontuacao = 86;

function calcularVencedorDoDia(apostas, pontuacao){
  
  let distancia = calcularDistacia(apostas, pontuacao);

  let ganhadores = encontrarVencedores(distancia);

  let mensagem = montarMensagem(ganhadores);

  console.log(mensagem);

  return ganhadores;
}

const data = {
  users:[
    "Alan",
    "Alex",
    "Arthur",
    "Daniel",
    "Gruber",
    "Loren",
    "Zé"
  ],
  betDates: {
    "2024-04-01": {
      bets: {
        "Alan":81,
        "Alex":84,
        "Arthur":0,
        "Daniel":83,
        "Gruber":89,
        "Loren":80,
        "Zé":82
      },
      score: 78,
    },
    "2024-04-02": {
      bets: {
        "Alan":81,
        "Alex":78,
        "Arthur":82,
        "Daniel":80,
        "Gruber":86,
        "Loren":85,
        "Zé":77
      },
      score: 86,
    }
  }
};

function calcularLeaderBoard(data){
  let betsMonth = data.betDates;
  let counting = [];
  let sum = [];
  
  for(day of Object.keys(betsMonth)){
    let {bets, score} = betsMonth[day]
    counting[day] = calcularVencedorDoDia(bets, score);
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

  let message = `
  Leaderboard - Abril`;

  leaderboard.forEach(place => {
    let {position, user, score} = place;
    message += `
    ` + position + " - " + score + " pontos - " + user;
  })

  return leaderboard, message;

}

calcularLeaderBoard(data);

//calcularVencedorDoDia(apostasComSnipada, pontuacao);


//Todo
/*
  [x] - somar pontos
  [x] - ordernar e imprimir
  [ ] - imprimir apenas dia atual
  [ ] - coletar dados
  [ ] - ordernar por snipadas
  [ ] - ordernar por quantidade de votos
*/