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

module.exports = {getDate, getYesterdayDate};