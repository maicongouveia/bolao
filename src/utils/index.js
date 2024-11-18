const getDate = () => {
  let now = new Date();
  now = now.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split("/");
  let date = now[0]+"/"+now[1];
  return date;
}

const getFullDate = () => {
  let now = new Date();
  now = now.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
  return now;
}

const getYesterdayDate = () => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1)
  yesterday = yesterday.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split('/')
  let date = yesterday[0]+"/"+yesterday[1];
  //console.log(date);  
  return date;
}

const getFullYesterdayDate = () => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1)
  yesterday = yesterday.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split(',')[0].split('/')
  yesterday = yesterday[2]+"-"+yesterday[1]+"-"+yesterday[0]
  return yesterday;
}


const getMonth = () => {
  let now = new Date();
  let monthIndex = now.getMonth();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]

  return months[monthIndex];
}

function getHours(){
  let date = getFullDate();
  let hour = date.split(",")[1].split(":")[0].trim();
  return hour;  
}

function greet() {
  let hour = getHours();
  let greet;
  if (hour >= 5 && hour < 12) {
    greet = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greet = "Boa tarde";
  } else {
    greet = "Boa noite";
  }

  return greet;
}


module.exports = {getDate, getFullDate, getYesterdayDate, getFullYesterdayDate, getMonth, greet};