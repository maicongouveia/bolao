const {google} = require('googleapis');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const filePath = appDir + "/../credentials.json";
const utils = require("../utils/index");

const spreadsheetId = "15maJIAB28avJGYQ-03u1b4C_QmcOtQioHPWcEolVors";

const googleSheetsClient = async() => {
  const auth = new google.auth.GoogleAuth({
    keyFile: filePath,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  
  // Create client instance for auth
  const client = await auth.getClient();
  
  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  
  return googleSheets
}

const getAllData = async(majorDimension = null) => {

  if(!majorDimension) {
    majorDimension = "COLUMNS";
  }

  const googleSheets = await googleSheetsClient();

  const month = utils.getMonth();
  const range = month + "!B1:AG9";

  const getRows = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range,
    majorDimension
  });

  let data = getRows.data.values;

  return data;
  
}

const setData = async(values) => {

  const googleSheets = await googleSheetsClient();

  const body = {
    values,
  };

  const month = utils.getMonth();
  const range = month + "!B1";

  googleSheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: body
  }).then( response => {
    console.log("Sheets updated");
  }) 

}

const getSleepScore = async() => {
  const data = await getAllData("ROWS");
  const sleepScoreRowIndex = data.length - 1;
  //console.log(data[sleepScoreRowIndex]);
  return data[sleepScoreRowIndex];
}

module.exports = {getAllData, setData, getSleepScore};