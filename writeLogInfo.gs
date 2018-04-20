function writeLogInfo(currentSS, VRAcount, HPcount, UVcount, PRNcount, ORDcount, MISCcount, threadTime) {
  
  Logger.log("VRAS: " + VRAcount + "HPs: " + HPcount + "UVs: " + UVcount +"PRNs: " +  PRNcount + "ORD: " + ORDcount + "Misc:  " + MISCcount + "Last Thread Time: " + threadTime);
  
  //  Inputs all data into the spreadsheet, and records the time of the last email that was checked
  currentSS.appendRow(["", VRAcount, HPcount, UVcount, PRNcount, ORDcount, MISCcount, threadTime]);
  
}
