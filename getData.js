const {google} = require('googleapis');

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

  return response;
  
}

/* 
  Video: https://www.youtube.com/watch?v=PFJNJQCU_lo&ab_channel=JamesGrimshaw
  Github: https://github.com/jrgrimshaw/google-sheets-node/blob/master/index.js
*/