function onOpen(){
  let menu = SpreadsheetApp.getUi().createMenu("Automation");
  menu.addItem("Deep Search", "main");
  menu.addToUi();
}


function showInputBox() {
var ui = SpreadsheetApp.getUi();
var input = ui.prompt("Enter Name");
var response = input.getResponseText();
return response;
}


function strikeCheck (sheetNum, row, column, value) {

// try to set new active sheet here
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[sheetNum]);



var range = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().offset(row,column);
var val = range.getValue();
Logger.log(val);
var strike = range.getTextStyle().isStrikethrough();

if (val == value && strike == true) {
  return true;
}

if (val == value && strike == false){
  return false;
}

if (val != value){
  var errorMessage = "Could not find user."
  return errorMessage;
}


Logger.log(strike);




}




function main () {
  var response = showInputBox();
  Logger.log(response);
  var rowCount = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().getNumRows();
  Logger.log(rowCount);
  const numSheets = SpreadsheetApp.getActive().getNumSheets();
  Logger.log(numSheets);

  var completed = false;


  for (j=0; j<numSheets; j++) {


    Logger.log("begin sheet " + ((j)+ 1))
    for (i=0; i<rowCount; i++) {
      rowCount = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().getNumRows();
      var strike = strikeCheck(j,i,0,response);

      if (strike == true){
        
        SpreadsheetApp.getUi().alert("Strike-Through: Yes");
        Logger.log("Strike-Through: Yes")
        completed = true;

        break;
      }

      else if (strike == false) {
        SpreadsheetApp.getUi().alert("Strike-Through: No");
        Logger.log("Strike-Through: No")

        completed = true;
        break;

      }

      //else if (strike == "Could not find user." && j == (numSheets)){
      //Logger.log("Employee not found!");
      //}
      
    // back in i for loop

    }

    // back in j for loop
      if (completed == true ){
      break;
    }

  }
  if (completed == false){
    SpreadsheetApp.getUi().alert("Employee Not Found!");
    Logger.log("Employee Not Found!")
  }
  // back in main 
}





