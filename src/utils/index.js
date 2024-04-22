const getDate = () => {
  let now = new Date();
  now = now.toISOString().split("T")[0].split("-");
  let date = now[2]+"/"+now[1];
  return date;
}

module.exports = {getDate};