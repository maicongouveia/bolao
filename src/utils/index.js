const getDate = () => {
  let now = new Date();
  now = now.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split("/");
  let date = now[0]+"/"+now[1];
  //console.log(date);
  return date;
}

const getYesterdayDate = () => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1)
  yesterday = yesterday.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split('/')
  let date = yesterday[0]+"/"+yesterday[1];
  //console.log(date);  
  return date;
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


module.exports = {getDate, getYesterdayDate, getMonth};