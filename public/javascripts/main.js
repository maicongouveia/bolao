async function missingBets() {
  const missingBetsRequest = await fetch('/missingbets');
  let response = await missingBetsRequest.json();
  //console.log(response.message);
  //remove loader
  let loaderElement = document.getElementsByClassName('loader')[0];
  if(loaderElement) loaderElement.remove();
    
  //Include message
  let textAreaInput = document.getElementById('whatsappWarningMessage');
  textAreaInput.value = response.message;
}

async function getBets(data = null, date = null){

  let bets;

  if(!data){
    const getBetsRequest = await fetch('/users/bets');
    let response = await getBetsRequest.json();

    bets = response.bets;
  } else {
    bets = data.bets;
  }
  
  if(!date){
    date = getDate();
  }

  //console.log(response.bets);

  let betsTab = document.getElementById('betsTab');

  let betsContentTab = document.createElement('div');
  betsContentTab.setAttribute('id', 'betsContentTab');

  let title = document.createElement('h3');
  title.innerText = "Apostas - " + date;

  betsContentTab.appendChild(title);

  let form = document.createElement('form');
  form.setAttribute('id', 'betsForm');
  form.setAttribute('action', '/bets');

  let ul = document.createElement('ul');

  Object.keys(bets).forEach( name => {
      let row = document.createElement('li');

      let label = document.createElement('label');
      label.innerText = name;
      label.setAttribute('for', name);

      let input = document.createElement('input')
      input.type = 'text';
      input.id = name;
      if(bets[name] != '0'){
        input.value = bets[name];
      }

      row.appendChild(label);
      row.appendChild(input);

      ul.appendChild(row)

      form.appendChild(ul);

      betsContentTab.appendChild(form);
    }
  )

  betsTab.appendChild(betsContentTab)


}

function getDate(){
  let now = new Date();
  now = now.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split("/");
  let date = now[0]+"/"+now[1];
  //console.log(date);
  return date;
}

function getYesterdayDate(){
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  yesterday = yesterday.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split("/");
  let date = yesterday[0]+"/"+yesterday[1];
  //console.log(date);
  return date;
}

function getValues(){
  let inputs = document.getElementById('betsForm').querySelectorAll('input[type=text]');
  let values = {};

  Object.keys(inputs).forEach(index => {
    values[inputs[index].id] = inputs[index].value;
  })

  //console.log(values)

  return values;
}

async function sendBets(date, values){
  let body = {date, values};
      
  let url = '/bets';
  //request
  await fetch(url , {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
  });  

}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

async function getLeaderboard(data = null){

  let leaderboard;
  let message;

  if(!data){
    const leaderboardRequest = await fetch('/leaderboard');
    const response = await leaderboardRequest.json();

    leaderboard = response.leaderboard;
    message = response.message;

  } else {
    leaderboard = data.leaderboard;
    message = data.message;
  }

  let loaderElement = document.getElementById('loaderLeaderboard');
  if(loaderElement) loaderElement.remove();

  let leaderboardTab = document.getElementById('leaderboardTab');  
  document.getElementById('leaderboardTab').innerHTML = "";

  //console.log(leaderboard);

  let table = document.createElement('table');
  table.setAttribute('class','w3-table-all w3-card-4 w3-centered');

  let trTitle   = document.createElement('tr');
  let titleCell = document.createElement('th');
  titleCell.innerText = "Maio/2024";
  titleCell.setAttribute('colspan', '3');

  trTitle.appendChild(titleCell);

  table.appendChild(trTitle);

  let tr                = document.createElement('tr');
  let positionTitleCell = document.createElement('th');
  let nameTitleCell     = document.createElement('th');
  let scoreTitleCell    = document.createElement('th');

  positionTitleCell.innerText = "<>";
  scoreTitleCell.innerText = "Pontos";
  nameTitleCell.innerText = "Nome";

  tr.appendChild(positionTitleCell);
  tr.appendChild(scoreTitleCell);
  tr.appendChild(nameTitleCell);

  table.appendChild(tr);

  leaderboard.forEach(row => {
    let tr           = document.createElement('tr');
    let positionCell = document.createElement('td');
    let scoreCell    = document.createElement('td');
    let nameCell     = document.createElement('td');

    positionCell.innerText = row.position + "º";
    scoreCell.innerText = row.score;
    nameCell.innerText = row.user;

    tr.appendChild(positionCell);
    tr.appendChild(scoreCell);
    tr.appendChild(nameCell);

    table.appendChild(tr);
  })

  leaderboardTab.appendChild(table);

  let textAreaInput = document.createElement('textarea')
  textAreaInput.value = message;

  leaderboardTab.appendChild(textAreaInput);

  //insert message on html
  let inputHidden = document.createElement('input');
  inputHidden.setAttribute('id', 'whatsappMessage');
  inputHidden.setAttribute('type', 'hidden');
  inputHidden.value = message;

  leaderboardTab.appendChild(inputHidden);

}

async function getSleepScore(date = null){
  const getSleepScoreRequest = await fetch('/sleepscore');
  let {score} = await getSleepScoreRequest.json();
  
  if (score){ 
    let sleepScoreInput = document.getElementById('sleepScore');
    sleepScoreInput.value = score;
  }
}

async function setSleepScore(date, score) {
  let body = {date, score};
      
  let url = '/sleepscore';
  //request
  await fetch(url , {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
  });    
}

async function getPageInfo(){
  const getPageInfoRequest = await fetch('/info');
  const response = await getPageInfoRequest.json();
  
  return response;
}

async function main() {
  let date = getDate();

  const {leaderBoardResponse, betsResponse} = await getPageInfo();
  
  await getLeaderboard(leaderBoardResponse);

  document.getElementsByTagName('button')[0].click();

  await getBets(betsResponse, date);
  await getSleepScore(date);
  await missingBets();

  let inputs = document.getElementById('betsForm').querySelectorAll('input[type=text]');

  //console.log(inputs);

  Object.keys(inputs).forEach(async (index) => {
    inputs[index].addEventListener('input', async () => {
      //pegar valores
      let values = getValues();
      await sendBets(date, values);
      await missingBets();
    });
  })

  const yesterdayDate = getYesterdayDate();

  document.getElementById('sleepScoreTabTitle').innerText += yesterdayDate;


}

main();