const {google} = require('googleapis');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const filePath = appDir + "/../credentials.json";

const getAllData = async() => {

    const auth = new google.auth.GoogleAuth({
      keyFile: filePath,
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

    return data;
  
}

module.exports = {getAllData};