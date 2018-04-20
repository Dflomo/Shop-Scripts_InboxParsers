function inboxCounter() {
  var gInbox = GmailApp;
  
  //Menu Items Dictionary Initializer(used for comparison of strings) + Empty Array for external counting
  var menuItems = createMenuDict();
  var mapArray = new Array(54);
  for(var i=0; i < mapArray.length;i++){
    mapArray[i] = 0;
  }
  var orderBreakStatement = "Can someone please come over to help me";
  
  //Basic variable initialization
  var VRAcount = 0;
  var HPcount = 0;
  var UVcount = 0;
  var PRNcount = 0;
  var ORDcount = 0;
  var MISCcount = 0;
  var counter = 0;
  var emailTime = 0;
  var intendedTime = 0;
  var timeComp = false;
  var messSubject;
  
  //Item Counter Spreadsheet Variables
  var mILink = "https://docs.google.com/spreadsheets/d/1CRlCJ3j-PowVRxtc3Gj2ujmJqJ2RLjtFGjWflQHJGPM/edit?usp=sharing";
  var mISS = SpreadsheetApp.openByUrl(mILink);
  var mItemCurrSS = mISS.getSheets()[mISS.getSheets().length -1];
  var mItemTemp = mISS.getSheetByName("Template");
  
  //Inbox Parsed Info Spreadsheet Variables
  var ssURL = "https://docs.google.com/spreadsheets/d/13izV5FunvRCHi9x8bEhLDcUAeid7abPpL6-dcpomq8k/edit#gid=9654033";
  var ss = SpreadsheetApp.openByUrl(ssURL);
  var ssSheet = ss.getSheets()[ss.getSheets().length -1];
  var ssTemplate = ss.getSheetByName("Template");
  var spreadTime = getSpreadTime(ssSheet); 
  
  var threadID = gInbox.getInboxThreads(0,35);
  var emailDerek = "derek.florimonte@workshopcafe.com";
  var newDate  = new Date();
  var temp = newDate;
  temp=+temp;
  var tomorrow = new Date(newDate.getTime() + (24 * 60 * 60 * 1000));
  var tomorrowStr = tomorrow.toDateString() + "\n";
  Logger.log(tomorrowStr);
  
  //// Uncomment below lines for date object logging/manipulation
  //  var dateHour = newDate.getHours();
  //  var dateMin = newDate.getMinutes();
  //  var dateSec = newDate.getSeconds();
  //  var millisecs = (dateHour * 60 * 60 * 1000) + (dateMin * 60 * 1000) + (dateSec * 1000);
  
  ////Script Properties Variables
  var scriptProperties = PropertiesService.getScriptProperties();  
  //  var newProp = {startRange: 1522413000000, sixTime: 1522414800000, tenTime: 1522472400000, endRange: 1522474200000};
  //  scriptProperties.setProperties(newProp);
  var startRange = scriptProperties.getProperty("startRange"); 
  var sixTime = scriptProperties.getProperty("sixTime"); 
  var tenTime = scriptProperties.getProperty("tenTime"); 
  var endRange = scriptProperties.getProperty("endRange");

  //// Uncomment below lines for set script properties logging
  //  Logger.log(newDate.getTime());
  //  Logger.log("sixTime: " + sixTime);
  //  Logger.log("tenTime: " + tenTime);
  //  Logger.log(newDate <= tenTime);
  //  Logger.log(newDate >= sixTime);
  //  Logger.log((newDate <= tenTime) && (newDate >= sixTime));
 
  //CHECK - Comparison to determine the correct time of day via script properties
  if((newDate <= tenTime) && (newDate >= sixTime) && (threadID != null)){
    
    for(var i = 0; i < threadID.length - 1; i++){
      var eMess = threadID[i].getMessages();
      messSubject = threadID[i].getFirstMessageSubject();
      emailTime = threadID[i].getLastMessageDate();
      Logger.log("\n\n" + messSubject);
      Logger.log("Thread Time: " + threadID[i].getLastMessageDate().getTime());
      Logger.log("Spread Time: " + spreadTime.getTime());
      timeComp = emailTime > spreadTime.getTime();
      Logger.log ("Email > Spread?: " + timeComp);
      
      ////CHECK - Comparison to see is the current eamil time is great than the previously recorded time in the Spreadsheet
      if(emailTime > spreadTime.getTime()){
        
        ////CHECK - Comparison for null email thread arrays, and the exempt test server emails for counting
        if(messSubject != null && messSubject.indexOf("TEST SERVER") == -1){
          
          ////CHECK SECTION - Following compariosns find particular phrases in the email thread subject lines, and counted accordingly
          if(messSubject.indexOf("VRA FRONT: #") > -1){
            VRAcount++;
            Logger.log("This is a VRA: " + messSubject);
          }
          else if(messSubject.indexOf("VRA BACK: #") > -1){
            VRAcount++;
            Logger.log("This is a VRA: " + messSubject);
          }
          else if(messSubject.indexOf("VRA MIDDLE: #") > -1){
            VRAcount++;
            Logger.log("This is a VRA: " + messSubject);
          }
          else if(messSubject.indexOf("HIGH PRIORITY:") > -1){
            HPcount++;
            Logger.log("This is a HP!"+ messSubject);
          }
          else if(messSubject.indexOf("Unverified Customer") > -1){
            UVcount++;
            Logger.log("This is a UV: " + messSubject);
          }
          else if(messSubject.indexOf("Print") > -1){
            PRNcount++;
              Logger.log("This is a Print: " + messSubject);
          }
          else if(messSubject.indexOf("New text message") > -1){
            ORDcount++;
            Logger.log("This is an order: " + messSubject);
            
            var tMess = eMess[counter].getPlainBody().toLowerCase();
            //FOR - map contains the menu
            for(each in menuItems){
              
              if(tMess.indexOf(each) > -1 && tMess.indexOf(orderBreakStatement) == -1){
                Logger.log("\n\n" + tMess + " ---> Contains ---> " + "\n\n" );
                Logger.log("---> " + each);
                mapArray[counter] += 1
              }
              counter += 1;
            }
            counter = 0;
          }
          else{
            MISCcount++;
            Logger.log("This is a Misc Email: " + messSubject);
          }
          if(threadID[0].getLastMessageDate() != null){
            Logger.log("Got to the thread check, for nulls - that time import is so wrong, only happens three times in the morning?!?!?!");
          }
        }
      }
    }
    intendedTime = threadID[0].getLastMessageDate();
    mItemCurrSS.appendRow([new Date(), mapArray[0], mapArray[1], mapArray[2], mapArray[3], mapArray[4], mapArray[5], 
                           mapArray[6], mapArray[7], mapArray[8], mapArray[9], mapArray[10], mapArray[11], mapArray[12], 
                           mapArray[13], mapArray[14], mapArray[15], mapArray[16], mapArray[17], mapArray[18], mapArray[19], 
                           mapArray[20], mapArray[21], mapArray[22], mapArray[23], mapArray[24], mapArray[25], mapArray[26], 
                           mapArray[27], mapArray[28], mapArray[29], mapArray[30], mapArray[31], mapArray[32], mapArray[33], 
                           mapArray[34], mapArray[35], mapArray[36], mapArray[37], mapArray[38], mapArray[39], mapArray[40], 
                           mapArray[41], mapArray[42], mapArray[43], mapArray[44], mapArray[45], mapArray[46], mapArray[47], 
                           mapArray[48], mapArray[49], mapArray[50], mapArray[51], mapArray[52]]);
    writeLogInfo(ssSheet, VRAcount, HPcount, UVcount, PRNcount, ORDcount, MISCcount, intendedTime);
  }
  ////CHECK - 10:00pm - 10:30pm Comparison
  else if(newDate >= tenTime && newDate <= endRange){
    Logger.log("Current Date: " + newDate.getTime());
    Logger.log("endRange: " + endRange);
    Logger.log("tenTime: " + tenTime);
    Logger.log("Got to 10:00pm - 10:30pm\n");
    var temp = 0;
    
    temp = endRange;
    temp=+temp;
    var tempEndRange = temp + 86400000;
    
    temp = tenTime;
    temp=+temp;
    var tempTenTime = temp + 86400000;
    
    temp = startRange;
    temp=+temp;
    var tempStartRange = temp + 86400000;
    
    temp = sixTime;
    temp=+temp;
    var tempSixTime = temp + 86400000;
    
    var newPropSet = {endRange: tempEndRange, tenTime: tempTenTime, sixTime: tempSixTime, startRange: tempStartRange};
    scriptProperties.setProperties(newPropSet, true);
    
    var tempNum = Number(startRange);
    var ssStartDate = new Date(tempNum);
    
    ss.insertSheet(tomorrowStr, ss.getNumSheets(), {template: ssTemplate});
    mISS.insertSheet(tomorrowStr, mISS.getNumSheets(), {template: mItemTemp});
    ssSheet = ss.getSheets()[ss.getSheets().length -1];
                  
    MailApp.sendEmail(emailDerek, "Going to Sleep! (Inbox Parser [FiDi])", "The Inbox Parser has sensed that it is roughly 10:00 - 10:30pm! Time to shut 'er down captain!");
  }
  //CHECK - 5:30am - 6:00am Comparison
  else if(newDate >= startRange && newDate <= sixTime){
    Logger.log("Got to 5:30am - 6:00am\n"); 
    writeLogInfo(ssSheet, "0","0","0","0","0","0", new Date());
    MailApp.sendEmail(emailDerek, "Waking Up!(Inbox Parser [FiDi])", "The Inbox Parser has sensed that it is roughly 5:30am - 6:00am! Yar! There be sun on the horizon!");
  }
  //CHECK - 10:30pm - 5:30am Comparison
  else if(newDate > endRange && newDate < startRange){
    Logger.log("Currently Sleeping\n"); 
  }
  Logger.log("Exiting Main Program\n\n");
}

