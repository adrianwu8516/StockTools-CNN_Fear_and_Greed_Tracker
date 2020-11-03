function CNNModule() {
  var url = 'https://money.cnn.com/data/fear-and-greed/';
  var xml = UrlFetchApp.fetch(url).getContentText();
  var CNNNow = parseInt(xml.replace(/[\s\S]*?Greed Now: ([0-9]*?) \(([\s\S]*?)\)[\s\S]*/, '$1'))
  var CNNNowSymbol = xml.replace(/[\s\S]*?Greed Now: ([0-9]*?) \(([\s\S]*?)\)[\s\S]*/, '$2')
  var CNNYest = parseInt(xml.replace(/[\s\S]*?Close: ([0-9]*?) [\s\S]*/, '$1'))
  var CNNObj = {
    now: CNNNow, 
    symbol: CNNNowSymbol, 
    change: Math.round((CNNNow - CNNYest)/CNNYest * 100) + "%"
  }
  return CNNObj
}

function findSheet(){
  var iter = DriveApp.getFilesByName("CNN_Fear_and_Greed_Index_Record")
  if(iter.hasNext()){
    return SpreadsheetApp.openById(iter.next().getId())
  }else{
    var fileId = DriveApp.getFileById("1nKQ8qhhI-dmxG61ryucQFm4_0p-uUg3f1Qv3Qz3VLAc").makeCopy('CNN_Fear_and_Greed_Index_Record').getId()
    Logger.log("Record file has been made: " + fileId)
    return SpreadsheetApp.openById(fileId)
  }
}

function dailyCrawler(){
  var sheet = findSheet();
  var today = new Date();
  var todayStr = String(today.getFullYear()) + "-" + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  var CNNObj = CNNModule()
  var targetRow = onSearch(sheet, todayStr, searchTargetCol=0)
  if(!(targetRow)){
    sheet.insertRowBefore(2);
    sheet.getRange('A2:D2').setValues([[todayStr, CNNObj.now, CNNObj.symbol, CNNObj.change]]);
  }
}