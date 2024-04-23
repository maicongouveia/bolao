const getDate = () => {
  let now = new Date();
  now = now.toLocaleString({timeZone: "America/Sao_Paulo"}).split("/");  
  let date = now[0]+"/"+now[1];
  //console.log(date);
  return date;
}

module.exports = {getDate};