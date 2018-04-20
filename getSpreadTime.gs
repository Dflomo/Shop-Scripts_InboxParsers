function getSpreadTime(ssSheet) {
  
  //Attempts to get the right, bottom most  data range (which will always be the last email date)
  var lastRow = ssSheet.getLastRow();
  var lastColumn = ssSheet.getLastColumn();
  var lastCell = ssSheet.getRange(lastRow, lastColumn);
  var cellStr = lastCell.getValue();
  var scriptProperties = PropertiesService.getScriptProperties();
  var importedLastEmailTime;
  
  Logger.log("Entered Spread Timer!\n");
  
  if(!lastCell.isBlank() && cellStr != "Thread Time" && cellStr != 0){
    
    Logger.log(cellStr + ": the time!!!!");
    Logger.log("Spreadsheet had a previous time to compare too!\n");
    return cellStr;
  }
  else{
    Logger.log("Spreadsheet was empty with no previous time\n");
    importedLastEmailTime = new Date();
    return importedLastEmailTime;
  }
}
